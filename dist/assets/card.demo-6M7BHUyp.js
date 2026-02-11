import{j as s,m as o}from"./index-BW0aMnOn.js";function r({children:l,className:a="",hover:e=!0,glow:d=!1,...t}){return s.jsx(o.div,{whileHover:e?{y:-2}:{},className:`
        rounded-xl border border-dark-400/50 bg-dark-700/50 backdrop-blur-sm
        p-6 transition-all duration-300
        ${e?"hover:border-dark-300/50":""}
        ${d?"glow-sm":""}
        ${a}
      `,...t,children:l})}function i(){return s.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 w-full",children:[s.jsxs(r,{className:"w-full sm:w-64",children:[s.jsx("h3",{className:"font-semibold mb-2",children:"Default Card"}),s.jsx("p",{className:"text-sm text-dark-100",children:"A simple card with hover effect."})]}),s.jsxs(r,{className:"w-full sm:w-64",glow:!0,children:[s.jsx("h3",{className:"font-semibold mb-2",children:"Glow Card"}),s.jsx("p",{className:"text-sm text-dark-100",children:"This card has a subtle glow."})]})]})}export{i as default};
