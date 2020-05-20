(window as any).PIXI   = require('phaser/build/custom/pixi');
(window as any).p2     = require('phaser/build/custom/p2');
(window as any).Phaser = require('phaser/build/custom/phaser-split');

import Boot from './states/boot';
import Preload from './states/preload';
import Title from './states/title';
import Gameplay from './states/gameplay';

const
	width = 1242,
	height = 2208,
	renderMode = Phaser.AUTO,
	container = '',
	game = new Phaser.Game(width, height, renderMode, container);

game.state.add('boot',    Boot);
game.state.add('preload', Preload);
game.state.add('title',   Title);
game.state.add('gameplay',   Gameplay);

game.state.start('boot');
