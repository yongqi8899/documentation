(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{446:function(n,e,a){"use strict";a.r(e);var t=a(58),o=Object(t.a)({},(function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h1",{attrs:{id:"shaders"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#shaders"}},[n._v("#")]),n._v(" Shaders")]),n._v(" "),a("h2",{attrs:{id:"spektrum-frag"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#spektrum-frag"}},[n._v("#")]),n._v(" spektrum.frag")]),n._v(" "),a("div",{staticClass:"language-gltf extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vMatCapUV;\n\nuniform sampler2D uMatCap;\nuniform float uSpecterSize;\nuniform float uWaveBorder;\nuniform float uWaveSpeed;\nuniform vec3 uBorderColor;\nuniform float uTime;\n\nvoid main() {\n    float n3= snoise3(vec3(vPosition.xz*5., uTime*0.01))*.5;\n\n    float w = sin(vPosition.y*5.-uTime*uWaveSpeed);\n\n     float borderMask = step(w,n3-uSpecterSize);\n    borderMask -=step(w,n3-(uSpecterSize+uWaveBorder));\n\n    vec4 borderOut = vec4(uBorderColor*borderMask, borderMask);\n\n    float mcMask = step(w,n3-uSpecterSize);\n    vec4 matCap = texture2D(uMatCap,vMatCapUV);\n    vec4 matCapOut = vec4(matCap.rgb, mcMask);\n\n    float opMask = 1.-vPosition.y;\n    opMask*=.15;\n    opMask+=.5;\n    vec4 opMaskOut = vec4(1.,1.,1.,opMask);\n    vec4 col = matCapOut+borderOut;\n    col*=opMaskOut;\n    gl_FragColor = vec4(col);\n\n    // float ypos = vPosition.y*0.2-0.4;\n    // if(ypos <= 0.) ypos = 0.;\n    // col = vec4(ypos);\n    // gl_FragColor = vec4(col.rbg, 1.);\n}\n")])])]),a("h2",{attrs:{id:"spektrum-vert"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#spektrum-vert"}},[n._v("#")]),n._v(" spektrum.vert")]),n._v(" "),a("div",{staticClass:"language-gltf extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)\n\nvarying vec2 vUv; \nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec2 vMatCapUV;\n\nuniform float uTime;\n\nvoid main() {\n    vUv = uv; \n    vNormal = normal;\n    vPosition = position;\n\n    vec4 p = vec4( position, 1. );\n\n    vec3 e = normalize( vec3( modelViewMatrix * p ) );\n    vec3 n = normalize( normalMatrix * normal );\n\n    vec3 r = reflect( e, n );\n    float m = 2. * sqrt(\n        pow( r.x, 2. ) +\n        pow( r.y, 2. ) +\n        pow( r.z + 1., 2. )\n    );\n    vMatCapUV = r.xy / m + .5;\n\n    float pN = snoise3(vec3(position.xz*2.,position.y-uTime*0.05));\n    float displaceIntensity = position.y*0.4-0.5;\n    if(displaceIntensity <= 0.) displaceIntensity = 0.;\n    float displace = pN*displaceIntensity +1.;\n\n    vec3 pos = position;\n    pos.xz*=displace;\n\n    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);\n    gl_Position = projectionMatrix * modelViewPosition; \n}\n")])])])])}),[],!1,null,null,null);e.default=o.exports}}]);