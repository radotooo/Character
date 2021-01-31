import { Container, Sprite } from 'pixi.js';
import gsap from 'gsap';
import Fire from './Fire';

export default class Rocket extends Container {
  /**
   * @param {String} name - The .name property which is going to be set to the DisplayObject
   * @param {String} textureName - The name of the texture to be used for the main body of the rocket
   * @param {Number} speed - The value which determines the speed of the rocket
   * @param {Number} acceleration - The value which determines the acceleration of the rocket
   * @param {Number} handling - The value which determines the handling of the rocket
   */
  constructor({ name = 'rocket', textureName, speed, acceleration, handling }) {
    super();

    this.name = name;

    this._speed = speed;
    this._acceleration = acceleration;
    this._handling = handling;

    this._inner = new Container();
    this._inner.sortableChildren = true;
    this._inner.name = 'rocket-inner';

    this._fire = new Fire();

    this.addChild(this._inner);
    this._createBody(textureName);
  }

  async show() {
    await gsap.fromTo(
      this._inner,
      { y: -150, alpha: 0 },
      { y: 0, alpha: 1, ease: 'elastic(1,0.5)', duration: 1.5 }
    );
    this.idle();
  }

  async hide() {
    await gsap.to(this._inner, {
      y: -150,
      alpha: 0,
      ease: 'back(1, 0.5)',
      duration: 1.5,
    });
  }

  idle() {
    gsap.fromTo(
      this._inner,
      { y: 0 },
      { y: -20, yoyo: true, repeat: -1, duration: 2 }
    );
  }

  ignite() {
    this._fire.ignite();
  }

  extinguish() {
    this._fire.extinguish();
  }

  /**
   * @description Crate instance of Fire all values are PIXI container properties
   */
  addFire(x, y, angle, scaleX = 1, scaleY = 1) {
    this._fire.x = x;
    this._fire.y = y;
    this._fire.scale.x = scaleX;
    this._fire.scale.y = scaleY;
    this._fire.zIndex = -100;
    this._fire.angle = angle;
    this._inner.addChild(this._fire);
  }

  /**
   * @readonly
   * @memberof Rocket
   * @returns {Number}
   */
  get acceleration() {
    return this._acceleration;
  }

  /**
   * @readonly
   * @memberof Rocket
   * @returns {Number}
   */
  get handling() {
    return this._handling;
  }

  /**
   * @readonly
   * @memberof Rocket
   * @returns {Number}
   */
  get speed() {
    return this._speed;
  }

  /**
   * @private
   * @param {String} textureName
   */
  _createBody(textureName) {
    this._body = new Sprite.from(textureName);
    this._body.y = 41;
    this._body.anchor.set(0.5);
    this._inner.addChild(this._body);
  }
}
