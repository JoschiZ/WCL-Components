/**@type {import("definitions/template").TemplateConfig} config*/
module.exports = {
    plugins: {
        exportString: true,
        autoTest: {
            active: true,
            loginMethod: "EUROPE",
            components: {
                FireBreathAlyzer: "https://www.warcraftlogs.com/reports/cNtPvy17QJb9wrX4#fight=15&view=components&source=194",
                GiantSlayerValue: "https://www.warcraftlogs.com/reports/cNtPvy17QJb9wrX4#fight=15&view=components&source=194",
                AlterTimeHeals: "https://www.warcraftlogs.com/reports/mRGZtWpdfYvng78a#fight=15&view=components&source=4"
            }
        }
    },
    components: {
        AlterTimeHeals: {
            h: 3,
            w: 1
        },
        GiantSlayerValue: {
            h: 1,
            w: 2
        }
    },
}