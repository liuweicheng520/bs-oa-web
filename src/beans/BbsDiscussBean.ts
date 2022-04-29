/**
 * 论坛 讨论
 */
import {BbsPostBean} from "@/beans/BbsPostBean";
import {UserBean} from "@/beans/UserBean";

export interface BbsDiscussBean {

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
   * 贴子ID
   */
  bbsPostId?: number;

  /**
   * 贴子
   */
  bbsPost?: BbsPostBean;

  /**
   * 类型
   */
  type?: string;

  /**
   * 用户ID
   */
  userId?: number;

  /**
   * 用户
   */
  user?: UserBean;

  /**
   * 内容
   */
  content?: string;

  /**
   * 其他信息
   */
  info?: object;

}