<h1 align="center">🌐 Trimly - URL Shortener & QR Code Generator 🚀</h1>

<p align="center">
  Trimly is a modern and efficient URL shortener and QR code generator, designed to simplify link management and enhance user experience. With robust user authentication and secure data handling, Trimly is your go-to solution for creating and managing short URLs and QR codes effortlessly.
</p>

---

<h2>✨ Features</h2>

<ul>
  <li>🔗 Short URL Generation: Instantly convert long URLs into short, shareable links.</li>
  <li>📝 URL Management: Save, edit, and manage your shortened URLs.</li>
  <li>📱 QR Code Generator: Generate QR codes for your short URLs to boost accessibility.</li>
  <li>🔒 Secure User Authentication: Register and log in with JWT-based authentication.</li>
  <li>🍪 Session Management: Efficiently manage user sessions with cookies.</li>
  <li>📊 Real-Time Analytics: Track and analyze link usage and performance.</li>
</ul>

---

<h2>💻 Technologies Used</h2>

<ul>
  <li><b>Node.js & Express.js:</b> Backend development and API management</li>
  <li><b>MongoDB & Mongoose:</b> Database management and schema modeling</li>
  <li><b>EJS (Embedded JavaScript):</b> Dynamic HTML templating</li>
  <li><b>bcryptjs:</b> Password hashing for secure authentication</li>
  <li><b>jsonwebtoken:</b> JWT for safe and reliable token-based login</li>
  <li><b>dotenv:</b> Manage environment variables securely</li>
  <li><b>cookie-parser:</b> Handle client cookies effectively</li>
</ul>

---

<h2>🚀 Getting Started</h2>

<h3>🔧 Installation</h3>

<pre>
git clone https://github.com/riteshkushwaha7/Trimly.git
cd Trimly
npm install
</pre>

<h3>🌐 Environment Variables</h3>

Create a <code>.env</code> file and add the following:
<pre>
PORT=5000
URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster.mongodb.net/Trimly
JWT_SECRET=your_jwt_secret_key
</pre>

<h3>🏃 Run the Server</h3>

<pre>
npm start
</pre>

Visit <a href="http://localhost:5000" target="_blank">http://localhost:5000</a>

---

<h2>📝 Contributing</h2>

<p>Contributions are welcome! Feel free to open an issue or submit a pull request.</p>

---

<h2>📄 License</h2>

<p>This project is licensed under the MIT License.</p>
