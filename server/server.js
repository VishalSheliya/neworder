const express = require("express");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const cors = require("cors");

const app = express();

// ✅ Allow CORS for Vercel, localhost, and wildcard subdomains
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:5173",
        "https://neworder-tau.vercel.app",
      ];
      if (
        !origin ||
        allowed.includes(origin) ||
        /\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "luminluxedata@gmail.com",
    pass: "jhpt dijp jipd xvjg", // consider using environment variable for security
  },
});

// ✅ PDF content generator
const generateContent = (data) => {
  const renderJewelryDetails = (details) => {
    if (!details) return [];
    let lines = [];
    lines.push(`Gold Type: ${details.goldType || "N/A"}`);
    lines.push(`Gold Color: ${details.goldColor || "N/A"}`);
    lines.push(`Diamond Type: ${details.diamondType || "N/A"}`);
    lines.push(
      `Diamond Colors: ${details.diamondColors?.join(", ") || "None"}`
    );
    lines.push(`Certification: ${details.diamondCertification || "N/A"}`);
    lines.push(`Clarities: ${details.clarities?.join(", ") || "None"}`);
    lines.push(`Diamond Size: ${details.diamondSize || "N/A"}`);
    lines.push(`Shapes: ${details.shapes?.join(", ") || "None"}`);
    lines.push(`Notes: ${details.notes || "N/A"}`);

    switch (data.jewelryType) {
      case "Ring":
        lines.push(`Ring Size: ${details.ringSize} (${details.sizeUnit})`);
        break;
      case "EarRing":
        lines.push(`Fitting Type: ${details.fittingType || "N/A"}`);
        break;
      case "Bracletes":
        lines.push(`Bracelet Size: ${details.braceletSize} inches`);
        break;
      case "Necklace":
        lines.push(`Necklace Size: ${details.necklaceSize} inches`);
        break;
      case "Pendant":
        lines.push(`Chain Option: ${details.chainOption}`);
        if (details.chainOption === "With Chain") {
          lines.push(`Jumping: ${details.jumping ? "Yes" : "No"}`);
          lines.push(`Chain Length: ${details.chainLength} mm`);
        }
        break;
      default:
        break;
    }
    return lines;
  };

  let content = [];
  content.push("Order Preview\n");
  content.push("Order Information");
  content.push(`Order ID: ${data.orderId}`);
  content.push(`Client Name: ${data.clientName}`);
  content.push(`Quantity: ${data.quantity}\n`);
  content.push("Product Information");
  content.push(
    data.file
      ? `Design File: ${data.file}`
      : `Product Name: ${data.productName}\nPrice: ₹${data.price}`
  );
  content.push(`Jewelry Type: ${data.jewelryType}\n`);
  content.push("Jewelry Specifications");
  content.push(...renderJewelryDetails(data.jewelryDetails));

  return content;
};

// ✅ Email send route
app.post("/send-email", async (req, res) => {
  const orderData = req.body;
  console.log("Incoming email request:", orderData); // 🐞 Debug

  const doc = new PDFDocument();
  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const pdfBuffer = Buffer.concat(buffers);

    const mailOptions = {
      from: "luminluxedata@gmail.com",
      to: "vishalsheliya14@gmail.com", // or use orderData.email if dynamic
      subject: "New Order",
      text: "Please find the attached order details.",
      attachments: [
        {
          filename: "order.pdf",
          content: pdfBuffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
        return res.status(500).send(`Error sending email: ${error.message}`);
      }
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    });
  });

  const content = generateContent(orderData);
  content.forEach((line) => doc.text(line));
  doc.end();
});

// ✅ Health check route for mobile test
app.get("/", (req, res) => {
  res.send("✅ Backend is working.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
