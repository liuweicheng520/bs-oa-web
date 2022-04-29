export interface UserQueryParam {

  /**
   * ID
   */
  id?: number;

  /**
   * 创建时间
   */
  username?: string;

  /**
   * 密码
   */
  password?: string;

  /**
   * 角色
   */
  roleCode?: string;

  /**
   * 其他信息
   */
  info?: object;

}