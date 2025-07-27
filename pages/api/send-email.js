import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import stream from "stream";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const data = req.body;

  // Generate PDF
  const doc = new PDFDocument();
  const bufferStream = new stream.PassThrough();
  let buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", async () => {
    const pdfBuffer = Buffer.concat(buffers);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "luminluxedata@gmail.com",
        pass: "jhpt dijp jipd xvjg",
      },
    });

    const mailOptions = {
      from: "luminluxedata@gmail.com",
      to: "vishalsheliya14@gmail.com", // or data.email
      subject: "New Order",
      text: "Please find the attached order details.",
      attachments: [
        {
          filename: "order.pdf",
          content: pdfBuffer,
        },
      ],
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).send(`Email error: ${error.message}`);
    }
  });

  // Write content to PDF
  const generateContent = (data) => {
    const lines = [];
    lines.push("Order Preview\n");
    lines.push(`Order ID: ${data.orderId}`);
    lines.push(`Client Name: ${data.clientName}`);
    lines.push(`Quantity: ${data.quantity}`);
    lines.push(`Jewelry Type: ${data.jewelryType}`);
    if (data.productName) lines.push(`Product Name: ${data.productName}`);
    if (data.price) lines.push(`Price: ₹${data.price}`);
    if (data.file) lines.push(`Design File: ${data.file}`);

    if (data.jewelryDetails) {
      lines.push("\nSpecifications:");
      const d = data.jewelryDetails;
      lines.push(`Gold Type: ${d.goldType}`);
      lines.push(`Gold Color: ${d.goldColor}`);
      lines.push(`Diamond Type: ${d.diamondType}`);
      lines.push(`Diamond Colors: ${d.diamondColors?.join(", ")}`);
      lines.push(`Certification: ${d.diamondCertification}`);
      lines.push(`Clarities: ${d.clarities?.join(", ")}`);
      lines.push(`Diamond Size: ${d.diamondSize}`);
      lines.push(`Shapes: ${d.shapes?.join(", ")}`);
      lines.push(`Notes: ${d.notes}`);
      if (data.jewelryType === "Ring")
        lines.push(`Ring Size: ${d.ringSize} (${d.sizeUnit})`);
    }
    return lines;
  };

  const content = generateContent(data);
  content.forEach((line) => doc.text(line));
  doc.end();
}
