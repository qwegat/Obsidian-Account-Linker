import AccountLinker from "main";
import {Modal,Setting} from "obsidian"
import drawAccountLink from "src/control/drawAccountLink";
import { websiteConfig } from "src/control/websiteConfig";
import { isColor,isURL } from "src/control/utils";

interface SettingsDir {
    name:Setting;
    color:Setting;
    urlTemplate:Setting;
    labelTemplate:Setting;
    doesReverseResolution:Setting;
    previewBox:Setting;
    saveButton:Setting;
}

interface DescriptionsDir {
    name: string;
    color: string;
    urlTemplate: string;
    labelTemplate: string;
    doesReverseResolution: string;
    previewBox: string;
    saveButton: string;
}

const descriptions: DescriptionsDir = {
    name: "Website name",
    color: "Website image color(HEX)",
    urlTemplate: "URL Replace Pattern",
    labelTemplate: "Account Name Replace Pattern",
    doesReverseResolution: "If on, it will reverse the account from the URL entered in the `accounts` field of the front matter",
    previewBox: "",
    saveButton: ""
}


export default class WebsiteEditModal extends Modal {
    plugin:AccountLinker
    config:websiteConfig
    
    closeCallBack:(websiteConfig:websiteConfig)=>void;
    constructor(plugin:AccountLinker,config:websiteConfig,closeCallBack:(websiteConfig:websiteConfig)=>void) {
        super(plugin.app)
        this.plugin = plugin
        this.config = config
        this.closeCallBack = closeCallBack
    }
    onOpen(): void {
        const config = this.config
        this.titleEl.setText("Website Config")

        const settings:SettingsDir = {
            name: 
                new Setting(this.contentEl)
                    .setName("Name")
                    .setDesc(descriptions.name)
                    .addText(cb => {
                        cb
                            .setValue(config.name)
                            .setPlaceholder("Twitter")
                            .onChange((value: string) => {
                                config.name = value
                                this.updateText("name",settings)
                                this.updateDisplay(settings)
                            })
                    }),
            color:
                new Setting(this.contentEl)
                    .setName("Color")
                    .setDesc(descriptions.color)
                    .addText(cb => {
                        cb
                            .setValue(config.color)
                            .setPlaceholder("#3e9cec")
                            .onChange((value:string)=>{
                                config.color = value
                                this.updateText("color", settings)
                                this.updateDisplay(settings)
                            })
                    }),
            urlTemplate:
                new Setting(this.contentEl)
                    .setName("URL Template")
                    .setDesc(descriptions.urlTemplate)
                    .addText(cb=>{
                        cb
                            .setValue(config.urlTemplate)
                            .setPlaceholder("https://twitter.com/{{NAME}}")
                            .onChange((value:string)=>{
                                config.urlTemplate = value
                                this.updateText("urlTemplate", settings)
                                this.updateDisplay(settings)
                            })
                    }),
            labelTemplate:
                new Setting(this.contentEl)
                    .setName("Label Template")
                    .setDesc(descriptions.labelTemplate)
                    .addText(cb =>{
                        cb
                            .setValue(config.labelTemplate)
                            .setPlaceholder("@{{NAME}}")
                            .onChange((value:string)=>{
                                config.labelTemplate = value
                                this.updateText("labelTemplate", settings)
                                this.updateDisplay(settings)
                            })
                    }),
            doesReverseResolution:
                new Setting(this.contentEl)
                    .setName("Reverse Resolution")
                    .setDesc(descriptions.doesReverseResolution)
                    .addToggle(cb=>{
                        cb
                            .setValue(config.doesReverseResolution)
                            .onChange((value:boolean)=>{
                                config.doesReverseResolution = value
                                this.updateText("doesReverseResolution", settings)
                                this.updateDisplay(settings)
                            })
                    }),
            previewBox: 
                new Setting(this.contentEl)
                    .setDesc(descriptions.previewBox)
                    .setName("Preview"),
            saveButton:
                new Setting(this.contentEl)
                    .setDesc(descriptions.saveButton)
                    .addButton(b => {
                        b
                            .setButtonText("Save")
                            .setDisabled(true)
                            .onClick((evt:MouseEvent)=>{
                                this.closeCallBack(config)
                                this.close();
                            })
                    })
        };
        ["name", "color", "urlTemplate", "labelTemplate", "doesReverseResolution"].forEach((key: "name" | "color" | "urlTemplate" | "labelTemplate" | "doesReverseResolution") => {
            this.updateText(key,settings)
        })
        this.updateDisplay(settings)
    }
    checkConfig(key:"name"|"color"|"urlTemplate"|"labelTemplate"|"doesReverseResolution") {
        switch (key) {
            case "name":
                if (this.config.name == ""){
                    return "The name length must be greater than zero"
                }else if (["aliases","tags","cssclass","publish","accounts"].includes(this.config.name.toLowerCase())) {
                    return "The name must be something other than `aliases`, `tags`, `cssclass`, `publish`, `accounts`"
                }else{
                    return ""
                }
            case "color":
                if (!isColor(this.config.color)){
                    return "The color must be represented by `#` and a six-digit hexadecimal number"
                }else{
                    return ""
                }
            case "urlTemplate":
                if (!isURL(this.config.urlTemplate.replace(/\{\{[^}]*\}\}/g,""))){
                    return "URL is invalid"
                }else{
                    return ""
                }
            case "labelTemplate":
                return ""
            case "doesReverseResolution":
                return ""
        }
    }
    updateText(key:"name"|"color"|"urlTemplate"|"labelTemplate"|"doesReverseResolution",settings:SettingsDir) {
        if (this.checkConfig(key) != ""){
            settings[key].descEl.innerHTML = descriptions[key]+`<br><span class='mod-warning'>${this.checkConfig(key)}</span>`
        }else{
            settings[key].descEl.innerHTML = descriptions[key]
        }
    }
    updateDisplay(settings:SettingsDir){
        let f = false;
        ["name","color","urlTemplate","labelTemplate","doesReverseResolution"].forEach((key:"name"|"color"|"urlTemplate"|"labelTemplate"|"doesReverseResolution")=>{
            if (this.checkConfig(key) != ""){
                f = true
            }
        })
        settings.saveButton.setDisabled(f)
        const linker = document.createElement("a")
        drawAccountLink(linker, this.config, "example")
        settings.previewBox.descEl.innerHTML = linker.outerHTML
        
    }
    
}