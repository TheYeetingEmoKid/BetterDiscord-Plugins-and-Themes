//META{"name":"ServerInfo"}*//
function ServerInfo() {
	this.getName = function(){ return "Server Info"; }
	this.getDescription = function(){ return "Adds functionality to see more information."; }
	this.getVersion = function(){ return "1.0"; }
	this.getAuthor = function(){ return "Bluscream"; }
}
ServerInfo.prototype.update = function() {};
ServerInfo.prototype.load = function() {};
ServerInfo.prototype.start = function() {
	var _require = ['BetterAPI', 'https://raw.githubusercontent.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins/0_BetterAPI.plugin.js', 'BetterAPI.isDebug()'];
	if(BdApi.getPlugin(_require[0]) !== null){
		try{eval(_require[2])
		}catch(e){
			Core.prototype.alert('Extended Info - Requirement not started!',''+
				'A requirement is not started: <b>'+_require[0]+'<b><br>'+
				'<br>'+
				'Click <a onClick="'+
					'$(\'.btn-settings\').click();'+
					'setTimeout(function(){ $(\'#bd-settings-new\').click();'+
					'setTimeout(function(){ $(\'#'+_require[0]+'\').prop(\'checked\', true);'+
					' }, 750); }, 750);'+
				'">here</a> to enable it.<br>'+
			'');
			return null;
		}
		try{$('ul[data-reactid=".0.1.1.0.1.0.0.1"]').livequery(function(){
			BetterAPI.addServerButton("serverinfobutton", "Server Info", "before");
			if(bot){BetterAPI.addServerButton("serverrolesbutton", "Server Roles", "after");}
		});
		}catch(e){}
		try{$("#serverinfobutton").livequery(function(){
			$("#serverinfobutton").click(function(){
				var _data = "";
				var _title = "Server Information";
				var uc = 0;var onuc = 0;var offuc = 0;var sowner = "";var sregion = "";
				if (!$('.bd-alert').length <= 0) {
					$('.bd-alert').remove();
				}
				var sname = BetterAPI.getCurrentServerName();
				var sid = BetterAPI.getCurrentServerID();
				if(bot){ if(bot.servers){var sinfo = bot.servers.get('id', sid); }}
				if(sinfo){
					sowner = sinfo.owner.username;
					sownerid = sinfo.owner.id;
					sregion = sinfo.region.capitalizeFirstLetter();
				}
				if(sinfo){if(sinfo.memberCount){ uc = sinfo.memberCount;
				}else{ uc = BetterAPI.userCount(); }}
				if(sinfo){if(sinfo.members.length){ onuc = sinfo.members.length;
				}else{ onuc = BetterAPI.onlineUserCount(); }}
				if(sinfo){if(sinfo.members.length){ offuc = sinfo.memberCount-sinfo.members.length;
				}else{ offuc = BetterAPI.offlineUserCount(); }}
				if(sid){
					var aurl = BetterAPI.getAvatarURL(''+sid);
				}
				var tcn = BetterAPI.getCurrentTextChannelName();
				var tcid = BetterAPI.getCurrentTextChannelID();
				var vc = BetterAPI.getCurrentVoiceChannelName();
				if(sname){ _title =		'Server Information - '+sname; _data = _data+'<b>Name: </b>'+sname+'<br>';	}
				if(sid){ _data +=		'<br><b>Server ID: </b>'+sid+''; }
				if(sowner){ _data +=	'<br><b>Server Owner: </b>'+sowner+' ('+sownerid+')'; }
				if(sregion){ _data +=	'<br><b>Server Location: </b>'+sregion+''; }
				if(tcn){ _data +=		'<br><b>Active Text Channel: </b>'+tcn+''; }
				if(tcid){ _data +=		'<br><b>Active Text Channel ID: </b>'+tcid+''; }
				if(vc){ _data +=		'<br><b>Active Voice Channel: </b>'+vc+''; }
				if(uc){ _data +=		'<br>Total Users: <b>'+uc+'</b>'; }
				if(onuc){ _data +=		'&nbsp;Online Users: <font color="green"><b>'+onuc+'</b></font>'; }
				if(offuc){ _data +=		'&nbsp;Offline Users: <font color="red"><b>'+offuc+'</b></font>'; }
				Core.prototype.alert(_title, ''+
					'<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="3">'+
						'<TR>'+
							'<TD><img width="165px" height="165px" src='+aurl+'></img></TD>'+
							'<TD>'+_data+'</TD>'+
						'</TR>'+
					'</TABLE>'+
				'');
			});
		});
		}catch(e){}
		if(bot){
			try{$("#serverrolesbutton").livequery(function(){
				$("#serverrolesbutton").click(function(){
					var _title = "Roles";
					var _sname = BetterAPI.getCurrentServerName();
					if(_sname){
						_title = _sname+" - Roles";
					}
					var roles = bot.servers.get('id', BetterAPI.getCurrentServerID()).roles;
					//, function(error,users){roles = users}
					$('body').append('<div class="bd-roles" id="bdroles" style="'+
						'position:fixed !important;'+
						'min-width:80% !important;'+
						'max-width:80% !important;'+
						'min-height:0 !important;'+
						'height:80%;'+
						'max-height:80% !important;'+
						'left:10% !important;'+
						'top:10% !important;'+
						'z-index:9999999 !important;'+
						'margin: auto;'+
						'border: 1px solid #323232;'+
						'box-shadow: 0 0 5px 3px rgba(30,30,30,.5);'+
						'color: #EBEBEB;'+
						'background-color: rgba(46,49,54,0.9) !important;">'+
						'<div class="bd-alert-header">'+
							'<span>BetterDiscord Roles List</span>'+
							'<div class="bd-alert-closebtn" onclick="$(this).parent().parent().remove();">×</div>'+
						'</div>'+
						'<div class="bd-alert-body" id="bdrolesbody" style="overflow:auto;height:100%;"></div>'+
					'</div>');
					$('#bdrolesbody').append('<table id="tg-yv9oF" class="bdbanlist tg" cellspacing="0" cellpadding="0" style="'+
						'min-width:100% !important;'+
						'max-width:100% !important;'+
						'max-height:100% !important;'+
						'overflow: auto;'+
					'">'+
						'<tr>'+
							'<th class="tg-031e">#</th>'+
							'<th class="tg-031e">Name</th>'+
							'<th class="tg-yw4l">ID</th>'+
							'<th class="tg-yw4l">Permissions</th>'+
						'</tr>'+
					'</table>');
					$.each(roles, function(i){
						$('.bdbanlist').append(''+
							'<tr class="banrow" count="'+roles[i].position+'">'+
								'<td>'+roles[i].position+'</td>'+
								'<td style="color:'+roles[i].colorAsHex()+'">'+roles[i].name+'</td>'+
								'<td>'+roles[i].id+'</td>'+
								'<td>'+roles[i].permissions+'</td>'+
							'</tr>'+
						'');
					});
				});
			});
			}catch(e){}
		}
	}else{
		Core.prototype.alert('Required plugin not found!',''+
			'A requirement is missing: <b>'+_require[0]+'</b><br>'+
			'<br>'+
			'Click <a href="#" onClick="require(\'shell\').openExternal(\'http://betterdiscord.net/ghdl?url='+_require[1]+'\')">here</a> to download the plugin.<br>'+
			'Save the downloaded file to "'+process.env.APPDATA+'\BetterDiscord\\plugins\\".'+
		'');
		return null;
	}
_require = null;
};
ServerInfo.prototype.onSwitch = function() {};
ServerInfo.prototype.onMessage = function() {};
ServerInfo.prototype.stop = function() {
	$('span[data-reactid=".0.4"').off('DOMNodeInserted.ServerInfo');
	$('#serverinfobutton').off('click');
	$('#serverinfobutton').remove();
};
ServerInfo.prototype.unload = function() {};
try{exports.ServerInfo = ServerInfo;}catch(e){console.warn('ServerInfo: Using old version, not exporting functions.')}