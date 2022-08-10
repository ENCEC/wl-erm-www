/*
 * @Author: Hongzf
 * @Date: 2022-07-22 16:25:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 16:08:30
 * @Description:
 */
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // 登录信息
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  userInfo: state => state.user.userInfo,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
  // dictionary: state => state.dictionary.dictionary
}
export default getters
