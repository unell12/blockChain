interface Config {
    url:string
}
declare module "myPackage" {
    function init(config:Config):Boolean
    function exit(code:Number):Number
}