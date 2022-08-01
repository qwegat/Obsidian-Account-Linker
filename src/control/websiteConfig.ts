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
        this.labelTemplate = ""
        this.doesReverseResolution = false
    }
}

export {websiteConfig}