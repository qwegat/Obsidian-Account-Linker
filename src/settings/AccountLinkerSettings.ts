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
            doesReverseResolution:true
        },
        {
            name:"GitHub",
            color:"#0a0c10",
            urlTemplate:"https://github.com/{{NAME}}",
            labelTemplate: "@{{NAME}}",
            doesReverseResolution:true
        },
        {
            name:"YouTube",
            color:"#f50015",
            urlTemplate:"https://www.youtube.com/channel/{{NAME}}",
            labelTemplate:"",
            doesReverseResolution:true
        }
    ]
}