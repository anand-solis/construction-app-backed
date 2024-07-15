require("module-alias/register");
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Json Body
app.use(express.json({ urlencoded: true }));
app.use(bodyParser.json());

// Documentation Imports
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("@/docs/swagger.json");

// Utils Imports
const connectDB = require("@/utils/connections/database/connectDB");

// Server Configuration
const PORT = process.env.PORT;

// Swagger Config Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cross-Origin Resource Sharing Policy
app.use(cors({ origin: "*" }));

// API Account Routes
app.use(require("@/routes/account/otp.route"));
app.use(require("@/routes/account/login.route"));
app.use(require("@/routes/account/logout.route"));
app.use(require("@/routes/account/profile.route"));
app.use(require("@/routes/account/user.route"));

// API APP Routes
app.use(require("@/routes/app/role.route"));
app.use(require("@/routes/app/feature.route"));
app.use(require("@/routes/app/defaultPermission.route"));
app.use(require("@/routes/app/subscriptionFeature.route"));
app.use(require("@/routes/app/subscription.route"));

// API File Routes
app.use(require("@/routes/file/file.route"));

// API Organization Routes
app.use(require("@/routes/organization/main/organization.route"));
app.use(require("@/routes/organization/main/permission.route"));
app.use(require("@/routes/organization/main/member.route"));
app.use(require("@/routes/organization/main/plan.route"));
app.use(require("@/routes/organization/main/workCategory.route"));

// API Organization -> Media Library Routes
app.use(require("@/routes/organization/mediaLibrary/mediaLibrary.route"));

// API Organization -> Site Routes
app.use(require("@/routes/organization/site/main/site.route"));
app.use(require("@/routes/organization/site/main/siteMember.route"));
app.use(require("@/routes/organization/site/floor/floor.route"));
app.use(require("@/routes/organization/site/main/siteUpload.route"));

// API Organization -> Site -> Task Routes
app.use(require("@/routes/organization/site/task/task.route"));
app.use(require("@/routes/organization/site/task/taskMember.route"));
app.use(require("@/routes/organization/site/task/taskTimeline.route"));
app.use(require("@/routes/organization/site/task/taskPhoto.route"));
app.use(require("@/routes/organization/site/task/taskAttachment.route"));
app.use(require("@/routes/organization/site/task/taskComment.route"));
app.use(require("@/routes/organization/site/task/taskIssue.route"));

// API Organization -> Site -> Material Routes
app.use(
  require("@/routes/organization/site/material/main/materialModuleMember.route")
);
app.use(
  require("@/routes/organization/site/material/purchase-order/purchaseOrderSetting.route")
);

// API Organization -> Site -> Attendance Routes
app.use(require("@/routes/organization/site/attendance/attendance.route"));
app.use(require("@/routes/organization/site/attendance/labour.route"));

// API Organization -> Vendor
app.use(require("@/routes/organization/main/vendor.route"));

//API Organization -> Material

app.use(require("@/routes/organization/main/material.route"));

//API Organization -> Material
app.use(require("@/routes/organization/main/bills.route"));

//API Organization -> BOQ

app.use(require("@/routes/organization/main/boq.route"));

// API Organization -> Commercial
app.use(require("@/routes/organization/org-commercial/getAllIndents.route"));
app.use(
  require("@/routes/organization/org-commercial/getAllPurchaseOrder.route")
);

// API Organization -> Site -> Commercial
app.use(require("@/routes/organization/site/commercial/commercial.route"));
app.use(require("@/routes/organization/site/commercial/purchaseOrder.route"));

// API Organization -> Site -> Issues

app.use(require("@/routes/organization/site/siteIssues/siteIssues.route"));
app.use(require("@/routes/stock/inventory.routes"));

//API Organization  --> money transfer
app.use(require("@/routes/organization/main/moneyTransfer.routes"));

// material issue
app.use(require("@/routes/organization/site/material/materialIssue.routes"));

// GRN
app.use(require("@/routes/organization/org-commercial/GRN.routes"));
app.use((req, res) => {
  res.status(404).send({
    status:false,
    message:"Request not found",
    data:{  }
  });
});



async function startServer() {
  try {
    // Connect to the database
    await connectDB();

    // Database connected successfully, now start the server
    app.listen(PORT, () => {
      console.log("Server is running on port :", PORT);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}
console.log("make console in server.js file")
startServer();

try {
  var a = 20
} catch (error) {
  console.log(error)
}

console.log(a);
