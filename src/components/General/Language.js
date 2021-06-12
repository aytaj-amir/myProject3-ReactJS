import React from 'react';
import { useTranslation } from 'react-i18next';


// export default class Language extends Component {
//   render(){
//     const { t, i18n } = useTranslation();

//     function handleClick(lang){
//       i18n.changeLanguage(lang);
//     }
//     return(
//       <div className="lang-button">
//            <button onClick={()=>handleClick('en')}>AZ</button>
//           <button onClick={()=>handleClick('az')}>EN</button>
//       </div>
//     )
//   }
// }

function Language(){
  const { t, i18n } = useTranslation();
  function handleClick(lang){
    
    i18n.changeLanguage(lang);
  }
  return(
    <div className="lang-button">
          <button onClick={()=>handleClick('en')}>AZ</button>
          <button onClick={()=>handleClick('az')}>EN</button>
      </div>
  )
}