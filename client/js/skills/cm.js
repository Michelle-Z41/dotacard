game.skills.cm = {
  slow: {
    cast: function (skill, source, target) {
      var spot = game.map.getPosition(target);
      var side = source.side();
      var opponent = game.opponent(side);
      var range = skill.data('aoe range');
      target.opponentsInRange(range, function (card) {
        source.damage(skill.data('damage'), card, skill.data('damage type'));
        source.addBuff(card, skill);
      });
    }
  },
  aura: {
    passive: function (skill, source) {
      var side = source.side();
      game[side].cardsPerTurn += 1;
      source.on('death.cm-aura');
      source.on('reborn.cm-aura');
      source.selfBuff(skill);
    },
    death: function (event, eventdata) {
      var cm = eventdata.target;
      var side = cm.side();
      game[side].cardsPerTurn -= 1;
    },
    reborn: function (event, eventdata) {
      var cm = eventdata.target;
      var side = cm.side();
      game[side].cardsPerTurn += 1;
    }
  },
  freeze: {
    cast: function (skill, source, target) {
      var buff = source.addBuff(target, skill);
      buff.data('source', source);
      target.addClass('rooted disarmed');
      target.on('turnend.cm-freeze', this.turnend);
      target.stopChanneling();
    },
    turnend: function (event, eventdata) {
      var target = eventdata.target;
      var buff = target.getBuff('cm-freeze');
      var source = buff.data('source');
      if(target.hasBuff('cm-freeze')) {
        source.damage(buff.data('dot'), target, buff.data('damage type'));
      } else {
        target.removeClass('rooted disarmed');
        target.off('turnend.cm-freeze');
      }
    }
  },
  ult: {
    cast: function (skill, source) {
      var spot = game.map.getPosition(source);
      source.addClass('cm-ult');
      source.selfBuff(skill, 'ult-source');
      source.on('channel', this.channel);
      source.on('channelEnd', this.channelEnd);
    },
    channel: function (event, eventdata) {
      var cm = eventdata.source;
      var skill = eventdata.skill;
      var range = skill.data('aoe range');
      cm.opponentsInRange(range, function (target) {
        cm.damage(skill.data('damage'), target, skill.data('damage type'));
        cm.addBuff(target, skill, 'ult-targets');
      });
    },
    channelEnd: function (event, eventdata) {
      var cm = eventdata.source;
      cm.data('cm-ult', null);
      cm.removeClass('cm-ult');
    }
  }
};
