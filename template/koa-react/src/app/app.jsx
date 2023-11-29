function App(props) {
    const {
        title = ",,Ծ‸Ծ,,",
        scripts = [],
        links = [],
        styles = [],
        children
    } = props

    return <html>
        <head>
            <title>{title}</title>
            <meta charSet="UTF-8"/>
            {links.map(({ href, rel = "stylesheet" }, index) => {
                return <link key={index} href={href} rel={rel}/>
            })}
            {styles.map((style, index) => {
                const innerHtml = { __html: style }
                return <style key={index} type="text/css" dangerouslySetInnerHTML={innerHtml}/>
            })}
        </head>
        <body>
            <div className="root" id="root">{children}</div>
            {scripts.map((script, index) => {
                const { src, content } = script
                const innerHtml = { __html: content }
                return <script key={index} defer type="text/javascript" src={src} dangerouslySetInnerHTML={innerHtml}/>
            })}
        </body>
    </html>
}

export default App