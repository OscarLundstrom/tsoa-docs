import{_ as s,c as a,o as e,V as n}from"./chunks/framework.7b697f60.js";const o="/docs/assets/SwaggerUI.32dd25e5.png",l="/docs/assets/SwUi-Response.53baa0c7.png",F=JSON.parse('{"title":"Live reloading","description":"","frontmatter":{"title":"Live reloading","lang":"en-US"},"headers":[],"relativePath":"live-reloading.md","filePath":"live-reloading.md"}'),t={name:"live-reloading.md"},p=n(`<h1 id="live-reloading" tabindex="-1">Live reloading <a class="header-anchor" href="#live-reloading" aria-label="Permalink to &quot;Live reloading&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">COMPATIBILITY NOTE</p><p>This guide requires Node.js &gt;= 8 and will target <a href="https://expressjs.com" target="_blank" rel="noreferrer">express</a>. We currently recommend using <a href="https://yarnpkg.com/en/" target="_blank" rel="noreferrer">Yarn</a>, npm should work but was not tested. We assume your setup is similar to the one recommended for <a href="/docs/getting-started.html">getting started</a></p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>We will use <a href="https://nodemon.io/" target="_blank" rel="noreferrer">nodemon</a> and <a href="https://github.com/TypeStrong/ts-node" target="_blank" rel="noreferrer">ts-node</a> for live reloading, but any tool that allows us to hook into the reloading process will do. Alternatives may, i.e. be a combination of <code>tsc -w</code> and triggering <code>tsoa spec-and-routes</code> using <a href="https://www.npmjs.com/package/onchange" target="_blank" rel="noreferrer"><code>onchange</code></a>.</p></div><p><strong>What we will talk about:</strong></p><nav class="table-of-contents"><ul><li><a href="#reloading-code">Reloading Code</a><ul><li><a href="#installing-nodemon-and-ts-node">Installing nodemon and ts-node</a></li><li><a href="#creating-a-nodemon-config">Creating a nodemon config</a></li><li><a href="#adding-a-dev-script">Adding a dev script</a></li></ul></li><li><a href="#supercharging-our-developer-experience-with-swaggerui">Supercharging our developer experience with SwaggerUI 🚀</a><ul><li><a href="#installing-swagger-ui-express">Installing Swagger UI Express</a></li><li><a href="#exposing-a-doc-endpoint">Exposing a /doc endpoint</a></li><li><a href="#inspecting-the-documentation">Inspecting the Documentation</a></li><li><a href="#sending-request-through-swaggerui">Sending Request through SwaggerUI</a></li></ul></li></ul></nav><h2 id="reloading-code" tabindex="-1">Reloading Code <a class="header-anchor" href="#reloading-code" aria-label="Permalink to &quot;Reloading Code&quot;">​</a></h2><h3 id="installing-nodemon-and-ts-node" tabindex="-1">Installing nodemon and ts-node <a class="header-anchor" href="#installing-nodemon-and-ts-node" aria-label="Permalink to &quot;Installing nodemon and ts-node&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nodemon</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ts-node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">concurrently</span></span></code></pre></div><h3 id="creating-a-nodemon-config" tabindex="-1">Creating a nodemon config <a class="header-anchor" href="#creating-a-nodemon-config" aria-label="Permalink to &quot;Creating a nodemon config&quot;">​</a></h3><p>Now, let&#39;s create a <code>nodemon.json</code> inside the root folder of our project that looks like this:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">exec</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts-node src/server.ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">watch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">ext</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="adding-a-dev-script" tabindex="-1">Adding a dev script <a class="header-anchor" href="#adding-a-dev-script" aria-label="Permalink to &quot;Adding a dev script&quot;">​</a></h3><p>Let&#39;s automatically start this setup with <code>yarn run dev</code>, and, while we&#39;re at it, a <code>build</code> and a <code>start</code> command in our <code>package.json</code>:</p><div class="language-diff"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;starter&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;version&quot;: &quot;0.0.1&quot;,</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;"> &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">   &quot;dev&quot;: &quot;concurrently \\&quot;nodemon\\&quot; \\&quot;nodemon -x tsoa spec-and-routes\\&quot;&quot;,</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">   &quot;build&quot;: &quot;tsoa spec-and-routes &amp;&amp; tsc&quot;,</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;">   &quot;start&quot;: &quot;node build/src/server.js&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;"> },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;dependencies&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // ...</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="supercharging-our-developer-experience-with-swaggerui" tabindex="-1">Supercharging our developer experience with SwaggerUI 🚀 <a class="header-anchor" href="#supercharging-our-developer-experience-with-swaggerui" aria-label="Permalink to &quot;Supercharging our developer experience with SwaggerUI :rocket:&quot;">​</a></h2><p><a href="https://swagger.io/tools/swagger-ui/" target="_blank" rel="noreferrer">SwaggerUI</a> is a great tool to inspect our OAS and the requests our server can handle.</p><p>While other great tools like <a href="https://github.com/Redocly/redoc" target="_blank" rel="noreferrer">Redoc</a> serve beautiful documentation, a major upside of using SwaggerUI during development is the instant feedback via the &quot;Try it out&quot; feature.</p><p>In order to make sure we always get the latest documentation during <em>development</em>, we will import the latest OAS file (<em>build/swagger.json</em>) every time someone hits that endpoint.</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>For performance reasons, importing the contents of the OAS file only once after starting the application is recommended in <em>production</em>.</p></div><h3 id="installing-swagger-ui-express" tabindex="-1">Installing Swagger UI Express <a class="header-anchor" href="#installing-swagger-ui-express" aria-label="Permalink to &quot;Installing Swagger UI Express&quot;">​</a></h3><p>This module allows you to serve auto-generated swagger-ui generated API docs from express, based on our OAS file. The result is living documentation for your API hosted from your API server via a route.</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">swagger-ui-express</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@types/swagger-ui-express</span></span></code></pre></div><h3 id="exposing-a-doc-endpoint" tabindex="-1">Exposing a <code>/doc</code> endpoint <a class="header-anchor" href="#exposing-a-doc-endpoint" aria-label="Permalink to &quot;Exposing a \`/doc\` endpoint&quot;">​</a></h3><p>Below the body-parser, let&#39;s add another handler <strong>before the call to <code>RegisterRoutes(app)</code></strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// src/app.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> express</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Response</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ExResponse</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Request</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ExRequest</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> swaggerUi </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">swagger-ui-express</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/docs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> swaggerUi</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">serve</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">_req</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExRequest</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ExResponse</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">swaggerUi</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">generateHTML</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">import</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../build/swagger.json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">  )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>In order to dynamically import json files, set</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">resolveJsonModule</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>in your <code>tsconfig.json</code> file.</p></div><h3 id="inspecting-the-documentation" tabindex="-1">Inspecting the Documentation <a class="header-anchor" href="#inspecting-the-documentation" aria-label="Permalink to &quot;Inspecting the Documentation&quot;">​</a></h3><p>Now, when we navigate to <a href="http://localhost:3000/docs" target="_blank" rel="noreferrer">localhost:3000/docs</a>, we should see a current reflection of our API.</p><p><img src="`+o+'" alt="SwaggerUI"></p><h3 id="sending-request-through-swaggerui" tabindex="-1">Sending Request through SwaggerUI <a class="header-anchor" href="#sending-request-through-swaggerui" aria-label="Permalink to &quot;Sending Request through SwaggerUI&quot;">​</a></h3><p>We can select Endponts, click the &quot;Try it out&quot; button and submit some data by filling out the form. When we hit &quot;Execute&quot;, that request will be sent to our server and the response will be displayed below the form.</p><p><img src="'+l+'" alt="SwaggerUI Response"></p>',32),r=[p];function c(i,d,y,g,u,D){return e(),a("div",null,r)}const C=s(t,[["render",c]]);export{F as __pageData,C as default};