/**
 * 题目
 */
import {QuestionGroupBean} from "@/beans/QuestionGroupBean";

export interface QuestionBean {

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
   * 题目组ID
   */
  questionGroupId?: number;

  /**
   * 题目组
   */
  questionGroup?: QuestionGroupBean;

  /**
   * 问题题目
   */
  questionTitle?: string;

  /**
   * 正确答案
   */
  rightAnswer?: string[];

  /**
   * 错误答案
   */
  errorAnswer?: string[];

  answer?: object;

  /**
   * 其他信息
   */
  info?: object;
  answerList?: any[];
}