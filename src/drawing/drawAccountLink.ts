import {replaceTemplateText,isColor,isURL,selectFontColor} from "../control/utils";
import { websiteConfig } from "../control/websiteConfig";

export default function drawAccountLink(a:HTMLAnchorElement,config:websiteConfig,text:string) {
    a.empty()
    a.classList.add("frontmatter-accounts")
    const linkText = replaceTemplateText(config.urlTemplate,{text:text})
    if (isURL(linkText)){
        a.href = linkText
    }else{
        a.href = ""
    }
    const siteNameDiv = a.createEl("div")
    siteNameDiv.classList.add("frontmatter-accounts-sitename")
    siteNameDiv.setText(config.name)
    siteNameDiv.style.backgroundColor = isColor(config.color)?config.color:"#ffffff"
    siteNameDiv.style.color = selectFontColor(config.color)
    const labelText = replaceTemplateText(config.labelTemplate, { text: text })
    if (labelText != "") {
        const labelDiv = a.createEl("div")
        labelDiv.classList.add("frontmatter-accounts-label")
        labelDiv.setText(labelText)
    }
}