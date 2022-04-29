export interface CourseParam {

  /**
   * 课程名称
   */
  courseName?: string;

  /**
   * 课程学科
   */
  courseSubject?: string;

  /**
   * 地址
   */
  address?: string;

  /**
   * 上课开始时间
   */
  startTime?: string;

  /**
   * 上课结束时间
   */
  endTime?: string;

  /**
   * 周数
   */
  weekDays?: string[];

  /**
   * 教师用户ID
   */
  teacherUserId?: number;

  /**
   * 教师信息
   */
  teacherInfo?: object;

  /**
   * 其他信息
   */
  info?: object;

}