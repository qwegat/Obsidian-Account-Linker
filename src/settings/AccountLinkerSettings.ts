import { websiteConfig } from "src/control/websiteConfig"

export interface AccountLinkerSettings {
    websites:websiteConfig[]
}

export const DEFAULT_SETTINGS: AccountLinkerSettings = {
    websites:[
        {
            name:"Twitter",
            color:"#3e9cec",
            urlTemplate:"https://twitter.com/{{NAME}}",
            labelTemplate:"@{{NAME}}",
            doesReverseResolution:false
        },
        {
            name:"Facebook",
            color:"#3b5998",
            urlTemplate:"https://www.facebook.com/{{NAME}}",
            labelTemplate:"{{NAME}}",
            doesReverseResolution:false
        },
        {
            name: "Instagram",
            color: "#dc2477",
            urlTemplate: "https://www.instagram.com/{{NAME}}",
            labelTemplate: "@{{NAME}}",
            doesReverseResolution: false
        },
        {
            name:"GitHub",
            color:"#0a0c10",
            urlTemplate:"https://github.com/{{NAME}}",
            labelTemplate: "@{{NAME}}",
            doesReverseResolution:false
        },
        {
            name:"Mail",
            color:"#e7e7e7",
            urlTemplate:"mailto:{{NAME}}",
            labelTemplate:"{{NAME}}",
            doesReverseResolution:false
        },
        {
            name: "Linktree",
            color: "#3ea195",
            urlTemplate: "https://linktr.ee/{{NAME}}",
            labelTemplate: "{{NAME}}",
            doesReverseResolution: false
        }
    ]
}