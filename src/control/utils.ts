
interface replaceTemplateTextContext {
    text: string;
}
export function replaceTemplateText(beforeText: string, ctx: replaceTemplateTextContext): string {
    return beforeText.split("{{NAME}}").join(ctx.text).replace(/\{\{[^}]*\}\}/g, "")
}

export function isColor(code:string):boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(code)
}

export function isURL(link:string):boolean {
    return new RegExp("^https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+$").test(link)
}

export function selectFontColor(backgroundColor: string): string {
    //https://zenn.dev/mryhryki/articles/2020-11-12-hatena-background-color
    if (!isColor(backgroundColor)){
        return "#000000"
    }
    const brightness =
        (parseInt(backgroundColor.substring(1, 3), 16) * 0.299) + // Red
        (parseInt(backgroundColor.substring(3, 5), 16) * 0.587) + // Green 
        (parseInt(backgroundColor.substring(5, 7), 16) * 0.114);   // Blue
    return Math.floor(brightness)>= 140 ? '#000000' : '#FFFFFF'
}