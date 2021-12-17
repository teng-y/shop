import Vue from 'vue'
//引入并注册element-ui，部分引入
import 'default-passive-events'
import { Message, MessageBox,Button} from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Button)
