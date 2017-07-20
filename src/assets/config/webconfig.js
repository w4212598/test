/**
 * Created by john on 2017/7/11.
 */
export default (Vue)=>{
  Vue.prototype.webConfig={
    Domain:'zyc.s1.natapp.cc',
    Port:'',
    getImgPath(path){
      return `http://${this.Domain}:${this.Port}/${path}`;
    },
    getAjaxPath(controller,action){

      return `http://${this.Domain}:${this.Port}?r=${controller}/${action}`
    }
  }
}
