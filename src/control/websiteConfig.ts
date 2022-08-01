interface websiteConfig {
    name: string;
    color: string;
    urlTemplate: string;
    labelTemplate: string;
    doesReverseResolution: boolean;
}

class websiteConfig {
    constructor() {
        this.name = ""
        this.color = "#FFFFFF"
        this.urlTemplate = ""
        this.labelTemplate = "@{{NAME}}"
        this.doesReverseResolution = false
    }
}

export {websiteConfig}