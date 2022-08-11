import AccountLinker from "main"
import { MarkdownPostProcessorContext } from "obsidian";
import { websiteConfig } from "src/control/websiteConfig";
import drawAccountLink from "./drawAccountLink";

export const frontmatterProcessor = (plugin:AccountLinker) => async(el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void>=> {
    const frontmatter = el.querySelector(".frontmatter")
    if (frontmatter !== null) {
        const embed = el.querySelector(".internal-embed") as HTMLElement
        if (embed !== null) {
            return
        }
        
        
        if (ctx.frontmatter){
            const siteDict: { [key: string]: websiteConfig[] } = {};
            plugin.settings.websites.forEach(config=>{
                if (!Object.keys(siteDict).includes(config.name.toLowerCase())){
                    siteDict[config.name.toLowerCase()] = []
                }
                siteDict[config.name.toLowerCase()].push(config)
            })
            console.log(siteDict)
            const accountList:{config:websiteConfig;value:string}[] = []
            Object.keys(ctx.frontmatter).forEach(key=>{
                if (Object.keys(siteDict).includes(key.toLowerCase())){
                    const lk = key.toLowerCase()
                    siteDict[lk].forEach(config=>{
                        frontMatterRecursion(ctx.frontmatter[key],config,accountList)
                    })
                }
            })

            const target = el.querySelector(".frontmatter-container") as HTMLElement
            if (accountList.length) {
                const frontmatterSection = target.createDiv({ cls: "frontmatter-section" })
                frontmatterSection.createDiv({ cls: "frontmatter-section-label" })
                const section = frontmatterSection.createDiv({ cls: "frontmatter-section-accounts" })
                accountList.forEach(a => {
                    const linkTag = section.createEl("a")
                    drawAccountLink(linkTag, a.config, a.value)
                })
                target.style.display = "block"

            }
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function frontMatterRecursion(value:any[]|string,config:websiteConfig,accountList:{config:websiteConfig;value:string}[]){
    if (typeof value === "string"){
        accountList.push({
            config:config,
            value:value
        })
    }else{
        value.forEach(v=>{
            frontMatterRecursion(v, config, accountList)
        })
    }
}