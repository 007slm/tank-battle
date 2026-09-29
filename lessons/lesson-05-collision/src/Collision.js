/**
 * 碰撞检测工具类 (Collision)
 * 采用 AABB 矩形重叠算法，判断两个游戏实体是否撞在一起！
 */
export class Collision {
  /**
   * 判断两个矩形对象是否发生重叠
   * 每个对象需包含 { x, y, width, height }
   */
  static isOverlap(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}
