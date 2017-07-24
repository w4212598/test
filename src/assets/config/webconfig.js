/**
 * Created by john on 2017/7/11.
 */
export default (Vue)=>{
  Vue.prototype.webConfig={
    Domain:'zyc.s1.natapp.cc',
    Port:'',
    getImgPath(path){
      return `https://${this.Domain}:${this.Port}/${path}`;
    },
    getAjaxPath(controller,action){

      return `https://${this.Domain}:${this.Port}?r=${controller}/${action}`
    }
  }
}
