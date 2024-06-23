const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
	console.log('im online')
});
const prefix = ''
const db =  require('quick.db')
client.on('message', mochakisscam => {
    if (!mochakisscam.content.startsWith(prefix) || mochakisscam.author.bot) return;

    const args = mochakisscam.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
	const user = mochakisscam.mentions.users.first();
	const reason = args.slice(1).join(" ")
	if(user) {
    if(command === 'نصاب') {
      if(!user) return mochakisscam.channel.send("لم اجد هذا العضو تاكد من انا العضو فالسرفر!");
      if (!mochakisscam.member.hasPermission('MANAGE_GUILD')) return
		if(!reason) return mochakisscam.channel.send('الرجاء كتابة الادلة و القصة بعد المنشن')
        mochakisscam.channel.send(`added ${user.tag} to User list`)
        db.set(user.id + 'scam', 'true')
		db.set(`reason_${mochakisscam.guild.id}_${user.id}`, reason);
    }
	const reason1 = db.get(`reason_${mochakisscam.guild.id}_${user.id}`, reason);
	const id1 = db.get('User.id')
    if(command === "فحص") {
      if(!user) return mochakisscam.channel.send("لم اجد هذا العضو تاكد من انا العضو فالسرفر!");
        if(db.has(user.id + "scam")){
			let DirtyEmbedForStaff = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setTitle(user.tag)
			.setDescription(`نصاب!!! الرجاء عدم التعامل معه \nالقصة و الدلائل : ${reason1}`)
			let dirtyembed = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setTitle(user.tag)
			.setDescription('نصاب!!! الرجاء عدم التعامل معه')
			if (mochakisscam.member.hasPermission('MANAGE_GUILD')) return mochakisscam.channel.send(DirtyEmbedForStaff)
            if (!mochakisscam.member.hasPermission('MANAGE_GUILD')) return mochakisscam.channel.send(dirtyembed)
        }
         if(!db.has(user.id + "scam")){
			 let cleanembed = new Discord.MessageEmbed()
			 .setColor("#00FF00")
			 .setTitle(user.tag)
			 .setDescription("غير موجود في قائمة النصابين \n لكن انتبه هذا لايعني انه مضمون")
            mochakisscam.channel.send(cleanembed) 
                 }
				}
        if(command === "مسح") {
          if(!user) return mochakisscam.channel.send("لم اجد هذا العضو تاكد من انا العضو فالسرفر!");
          if (!mochakisscam.member.hasPermission('MANAGE_GUILD')) return
			let deleteembed = new Discord.MessageEmbed()
			.setDescription(`تمت ازالة ${user.tag} من قائمة النصابين`)
            mochakisscam.channel.send(deleteembed)
            db.delete(user.id + "scam")
        }
} 

});

client.login(process.env.token);