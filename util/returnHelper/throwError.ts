import {RpgLogs} from "@rpglogs/report-component-types/warcraft";

export default function throwError(componentName: string, message: string): RpgLogs.EnhancedMarkdownComponent {

    return {
        component: "EnhancedMarkdown",
        props: {
            content: `
<u># ${componentName} Error</u>
${message}
`
        }
    }
}