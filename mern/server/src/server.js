import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { mongoRouter } from "./routes/mongo.router.js";
import { collections } from "./services/database.service.js";
import { ObjectId } from "mongodb";
import nodemailer from 'nodemailer';
import cors from "cors"
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


// Eric's stuff

import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { uploadxml, retrievexml } from './invoice/invoice.js';
import xmljs from 'xml-js';


const app = express();
const port = 8080; // default port to listen
app.use(express.json());
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

//Configuration for Multer
const upload = multer({ dest: "public/files" });

app.post("/send-email", async (req, res) => {

    const { pdfFileData, sendTo } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "applepiestorage@gmail.com",
            pass: "sgjrbyuqghwwbtrc",
        },
    });
    const mailOptions = {
        from: '"Applepie Storage" applepiestorage@gmail.com',
        to: sendTo,
        subject: "Invoice attachment",
        text: "Please find the PDF attachment.",
        attachments: [
            {
                filename: "myfile.pdf",
                content: Buffer.from(pdfFileData, 'base64'),
                contentType: "application/pdf",
            },
        ],
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully.");
    } catch (error) {
        res.status(500).send(`Error sending email: ${error}`);
    }
});

app.post("/upload", upload.single("myfile"), (req, res) => {
    console.log("uplaoding files");
    try {
        const xmlString = fs.readFileSync(req.file.path, 'utf8');
        const jsonObject = uploadxml(xmlString);
        res.status(200).send(jsonObject);
    } catch (err) {
        res.status(400).send('ERROR: Upload failure.')
    }
});

app.post("/retrieve", (req, res) => {
    console.log("retrieving file");
    try {
        const jsonObject = {
            xml: {
                _declaration: req.body._declaration,
                Invoice: req.body.Invoice,
            }
        }
        const result = retrievexml(jsonObject)
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send('ERROR: Upload failure.')
    }
});

// Get by ID
app.get("/get", async (req, res) => {
    console.log("getting")
    const id = req?.query?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const invoice = await collections.invoices.findOne(query);
        if (invoice) {
            const jsonObject = { Invoice: invoice.XMLfile }
            console.log(jsonObject);
            const xmlArray = xmljs.json2xml(jsonObject, { compact: true, spaces: 2 });
            console.log(xmlArray);
            res.status(200).send(xmlArray);
        }
    } catch (error) {
        res
            .status(404)
            .send(`Unable to find matching document with id: ${req.params.id}`);
    }
});




// Mongo stuff
connectToDatabase()
    .then(() => {

        app.use("/invoices", mongoRouter);

        // Serve the index.html file for any other requests
        app.get('/', (req, res) => {
            res.sendFile(path.join("server", 'static/index.html'));
        });

        // start the Express server
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed", error);
        process.exit();
    });


