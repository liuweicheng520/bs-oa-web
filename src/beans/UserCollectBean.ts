/**
 * 用户收藏
 */
import {UserBean} from "@/beans/UserBean";

export interface UserCollectBean {

  /**
   * ID
   */
  id?: number;
  
  /**
   * 创建时间
   */
  createTime?: string;
  
  /**
   * 更新时间
   */
  updateTime?: string;
  
  /**
   * 用户ID
   */
  userId?: number;
  
  /**
   * 用户
   */
  user?: UserBean;
  
  /**
   * 目标类型
   */
  targetType?: string;
  
  /**
   * 目标ID
   */
  targetId?: number;
  
}