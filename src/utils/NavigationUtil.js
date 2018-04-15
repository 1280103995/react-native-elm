/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {NavigationActions} from 'react-navigation'

const reset = (navigation, routeName) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName})]
  })
  navigation.dispatch(resetAction)
}

export default {reset}

// 使用reset action重置路由
// const resetAction = NavigationActions.reset({
//     index: 1,  // 注意不要越界
//     actions: [  // 栈里的路由信息会从 Home->HomeTwo 变成了 Bill->BillTwo
//         NavigationActions.navigate({ routeName: 'Bill'}),
//         NavigationActions.navigate({ routeName: 'BillTwo'})
//     ]
// });
