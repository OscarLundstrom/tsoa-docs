import{_ as e,c as o,o as a,V as t}from"./chunks/framework.7b697f60.js";const f=JSON.parse('{"title":"FAQ","description":"","frontmatter":{"title":"FAQ","lang":"en-US"},"headers":[],"relativePath":"faq.md","filePath":"faq.md"}'),s={name:"faq.md"},i=t(`<h1 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-label="Permalink to &quot;FAQ&quot;">​</a></h1><h2 id="can-i-use-openapi-3-instead-of-openapi-2-formerly-swagger" tabindex="-1">Can I use OpenAPI 3 instead of OpenAPI 2 (formerly Swagger)? <a class="header-anchor" href="#can-i-use-openapi-3-instead-of-openapi-2-formerly-swagger" aria-label="Permalink to &quot;Can I use OpenAPI 3 instead of OpenAPI 2 (formerly Swagger)?&quot;">​</a></h2><p>Yes, set <code>spec.specVersion</code> to <code>3</code> in your <code>tsoa.json</code> file. See more config options by looking at <a href="https://github.com/lukeautry/tsoa/blob/master/packages/runtime/src/config.ts" target="_blank" rel="noreferrer">the config type definition</a>.</p><h2 id="how-do-i-use-tsoa-with-koa-hapi-or-other-frameworks" tabindex="-1">How do I use tsoa with koa, hapi, or other frameworks? <a class="header-anchor" href="#how-do-i-use-tsoa-with-koa-hapi-or-other-frameworks" aria-label="Permalink to &quot;How do I use tsoa with koa, hapi, or other frameworks?&quot;">​</a></h2><p>Set the middleware property in your tsoa config. Out of the box, express, hapi and koa are supported. You can also provide a custom template, for more information, please check out <a href="./templates.html">the guide</a></p><h2 id="how-to-ensure-no-additional-properties-come-in-at-runtime" tabindex="-1">How to ensure no additional properties come in at runtime <a class="header-anchor" href="#how-to-ensure-no-additional-properties-come-in-at-runtime" aria-label="Permalink to &quot;How to ensure no additional properties come in at runtime&quot;">​</a></h2><p>By default, OpenAPI allows for models to have <a href="https://swagger.io/docs/specification/data-models/dictionaries/" target="_blank" rel="noreferrer"><code>additionalProperties</code></a>. If you would like to ensure at runtime that the data has only the properties defined in your models, set the <code>noImplicitAdditionalProperties</code> <a href="https://github.com/lukeautry/tsoa/blob/master/packages/runtime/src/config.ts" target="_blank" rel="noreferrer">config</a> option to either <code>&quot;silently-remove-extras&quot;</code> or <code>&quot;throw-on-extras&quot;</code>. Caveats:</p><ul><li>The following types will always allow additional properties due to the nature of the way they work: <ul><li>The <code>any</code> type</li><li>An indexed type (which explicitly allows additional properties) like <code>export interface IStringToStringDictionary { [key: string] : string }</code></li></ul></li><li>If you are using tsoa for an existing service that has consumers... <ul><li>you will need to inform your consumers before setting <code>noImplicitAdditionalProperties</code> to <code>&quot;throw-on-extras&quot;</code> since it would be a breaking change (due to the fact that request bodies that previously worked would now get an error).</li></ul></li><li>Regardless, <code>&quot;noImplicitAdditionalProperties&quot; : &quot;silently-remove-extras&quot;</code> is a great choice for both legacy AND new APIs (since this mirrors the behavior of C# serializers and other popular JSON serializers).</li></ul><h2 id="dealing-with-duplicate-model-names" tabindex="-1">Dealing with duplicate model names <a class="header-anchor" href="#dealing-with-duplicate-model-names" aria-label="Permalink to &quot;Dealing with duplicate model names&quot;">​</a></h2><p>If you have multiple models with the same name, you may get errors indicating that there are multiple matching models. If you&#39;d like to designate a class/interface as the &#39;canonical&#39; version of a model, add a jsdoc element marking it as such:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">tsoaModel</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyModel</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="how-can-i-get-the-most-from-my-oas" tabindex="-1">How can I get the most from my OAS? <a class="header-anchor" href="#how-can-i-get-the-most-from-my-oas" aria-label="Permalink to &quot;How can I get the most from my OAS?&quot;">​</a></h2><p>Now that you have a OpenAPI Specification (OAS) (swagger.json), you can use all kinds of amazing tools that generate documentation, client SDKs, and more <a href="http://openapi.tools" target="_blank" rel="noreferrer">here</a>.</p>`,13),n=[i];function r(l,c,p,d,h,u){return a(),o("div",null,n)}const y=e(s,[["render",r]]);export{f as __pageData,y as default};
