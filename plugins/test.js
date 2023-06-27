const AutoTestPlugin = require("../plugins/AutoTestPlugin");
require('dotenv').config({path: "../.env"});

const autoTest = new AutoTestPlugin({
    loginMethod: "EUROPE",
    components: {
        Test: "https://www.warcraftlogs.com/reports/cNtPvy17QJb9wrX4#fight=15&view=components&source=194"
    }
})

const componentName = "Test"
const content = "Test"

autoTest.setupTestingBrowser().then((browser => this.browser = browser)).then((browser) => {
    autoTest.getTestingPage(browser, componentName).then((page) => {
        autoTest.runCode(page, content).then(() => {
                //callback()
            }
        )
    })
})