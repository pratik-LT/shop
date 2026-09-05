const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// ==============================
// FOLDERS
// ==============================

const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// ==============================
// MIDDLEWARE
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(uploadFolder));

// ==============================
// FILE UPLOAD SETTINGS
// ==============================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },

    filename: function (req, file, cb) {

        const extension = path.extname(file.originalname);

        const filename =
            Date.now() +
            "-" +
            Math.round(Math.random() * 100000) +
            extension;

        cb(null, filename);
    }

});

const upload = multer({

    storage: storage,

    limits: {
        fileSize: 15 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {

        const allowed = [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png"
        ];

        const extension =
            path.extname(file.originalname).toLowerCase();

        if (allowed.includes(extension)) {

            cb(null, true);

        } else {

            cb(
                new Error(
                    "Only PDF, JPG, JPEG and PNG files are allowed."
                )
            );

        }

    }

});

// ==============================
// PRINT ORDER
// ==============================

app.post(
    "/api/print-order",
    upload.single("file"),
    function (req, res) {

        try {

            const name = req.body.name;
            const mobile = req.body.mobile;
            const printType = req.body.printType;
            const copies = req.body.copies;

            if (!name || !mobile || !printType || !copies) {

                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }

                return res.status(400).json({
                    success: false,
                    message: "Please fill all details."
                });

            }

            if (!/^[0-9]{10}$/.test(mobile)) {

                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }

                return res.status(400).json({
                    success: false,
                    message: "Enter a valid 10 digit mobile number."
                });

            }

            if (!req.file) {

                return res.status(400).json({
                    success: false,
                    message: "Please upload a file."
                });

            }

            // Generate Order ID

            const orderID =
                "ICS-" +
                Date.now().toString().slice(-6);

            // Order information

            const order = {

                orderID: orderID,

                name: name,

                mobile: mobile,

                printType: printType,

                copies: copies,

                fileName: req.file.originalname,

                filePath: req.file.filename,

                time: new Date().toLocaleString("en-IN")

            };

            // Save order

            const orderFile =
                path.join(
                    __dirname,
                    "orders.json"
                );

            let orders = [];

            if (fs.existsSync(orderFile)) {

                orders =
                    JSON.parse(
                        fs.readFileSync(
                            orderFile,
                            "utf8"
                        )
                    );

            }

            orders.push(order);

            fs.writeFileSync(
                orderFile,
                JSON.stringify(
                    orders,
                    null,
                    2
                )
            );

            // Response

            res.json({

                success: true,

                orderID: orderID,

                message:
                    "Your print order has been submitted successfully."

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                    "Something went wrong."

            });

        }

    }
);

// ==============================
// START SERVER
// ==============================

app.listen(PORT, function () {

    console.log("");
    console.log(
        "======================================"
    );

    console.log(
        "IT COMPUTER SOLUTION"
    );

    console.log(
        "AND PHOTOCOPY"
    );

    console.log(
        "======================================"
    );

    console.log(
        `Website running at http://localhost:${PORT}`
    );

    console.log(
        "======================================"
    );

});