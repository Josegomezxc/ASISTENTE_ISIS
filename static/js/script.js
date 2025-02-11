// UI comp
const startBtn = document.querySelector(".button");
startBtn.innerHTML = "<i class='fa fa-microphone'></i>";
const result = document.querySelector(".card");
const processing = document.querySelector(".card2");
document.querySelector(".intro").append(startBtn);
document.querySelector(".intro").append(processing);
document.querySelector(".intro").append(result);

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.remove();
	result.innerHTML = "<b>Lo siento, tu navegador no soporta Speech API. Para usar a Isis, descarga la última versión de Google Chrome.<b>";
} else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
    recognition.lang = 'es-AR';
	recognition.onresult = event => {
		const last = event.results.length - 1;
		const res = event.results[last];
		const text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "Activa el micrófono y habla";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `<span class="Isis">Tú:</span> ${text} </br><span class="Isis">Isis:</span> ${response}`;
			processing.innerHTML = "Activa el micrófono de nuevo para hablar";
			result.appendChild(p);
            result.scrollTo(0, 1000);

			// text to speech
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
		} else {
			processing.innerHTML = `${text}`;
		}
	}
	let listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.innerHTML = "<i class='fa fa-microphone'></i>";
            startBtn.classList.remove("active");
		} else {
			recognition.start();
			startBtn.innerHTML = "<i class='fa fa-microphone-slash'></i>";
            startBtn.classList.add("active");
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}

// processor
function process(rawText) {
	let text = rawText.replace(/\s/g, "");
	text = text.toLowerCase();
	let response = null;

	if (text.includes("chiste")  || text.includes("chistes")) {
		chistes = ['Por qué las focas del circo miran siempre hacia arriba?   Porque es donde están los focos.',
                'Estás obsesionado con la comida!   No sé a que te refieres croquetamente.',
                'Por qué estás hablando con esas zapatillas?   Porque pone "converse."',
                'Buenos días, me gustaría alquilar "Batman Forever".   No es posible, tiene que devolverla tomorrow.',
				'¿Por qué llora un libro de matemáticas?   Porque tiene muchos problemas.',
				'¿Qué está al final de todo?   La letra o.',
				'¿Qué le dice un pez a otro?   Nada.',
				'¿Qué le dice un gusano a otro?   Me voy a dar la vuelta a la manzana.',
				'¿Qué le dice una vaca a otra?   No sé.',
				'¿Qué le dice una iguana a su hermana gemela?   Somos iguanitas.',
				'¿Cómo se dice pañuelo en japonés?   Sacamoko.',
				'Papá, ¿hay gelatina?   Pues que yo sepa nada más que existe la "i latina" y la "y griega".',
				'¿Qué le dice un semáforo a otro?   No me mires que me estoy cambiando.',
				'¿Qué le dice una pared a otra?   Nos vemos en la esquina.',
				'¿Sabes cómo se queda un mago después de comer?   Magordito.',
				'Papá, ¿cómo se dice perro en inglés?   Dog. ¿Y veterinario?  Pues Dog-tor.',
				'Alberto, ¿qué planeta va después de Marte?   Miércoles.',
				'Pepe, si en esta mano tengo 8 naranjas y en esta otra 6 naranjas.  ¿Qué tengo?  Unas manos enormes, profe.',
				'En China crearon un robot que en 3 minutos atrapó a 20 ladrones. En España en 2 Minutos atrapó a 10 Ladrones. En Argentina en 30 segundos se robaron al robot, jajaja.',
				'La M con la A suena MA, ¿y si le pones una tilde?   Matilde.',
				'¿Por qué las vacas viajan a Nueva York?   Para ver los muuuusicales.',
				'¿Está Agustín?  No, estoy incomodín.',
				'¿De dónde vienen los hamster?   De Hamsterdam.',
				'Qué estrés!  Dos más uno.',
				'¿Sabes qué le dice un jaguar a otro?  ¿Jaguar you?',
				'¿Cuál es la fruta más divertida?   La naranjajajajaja.',
				'Un hombre entra en un bar de pinchos   y dice:¡¡Ayyyyy!!',
				'Había una vez truz!',
            ];
		response = "Okey, aquí va un chiste. " + chistes[Math.floor(Math.random() * chistes.length)]; toggleBtn();
		
	}

	else if (text.includes("dato")  || text.includes("interesante") || text.includes("algo") || text.includes("innecesario") || text.includes("sepa") || text.includes("otracosa") ) {
		datos = [', jajaja mentira. No sé que decirte, mi vida es muy aburrida.',
				'cada año, cientos de árboles nuevos crecen porque hay ardillas que olvidan dónde enterraron sus nueces.',
				'hay una cancha de baloncesto en el último piso del edificio de la Corte Suprema de los Estados Unidos. Esta es conocida como la "cancha más alta en la tierra".',
				'aún cuando nunca han podido presenciarlo por sí mismas, las personas ciegas sonríen cuando están felices. Sonreír es un instinto humano básico.',
				'las vacas tienen mejores amigas y éstas tienden a pasar la mayor parte de su tiempo juntas.',
				'las nutrias se agarran de las manos cuando duermen para no separarse flotando.',
				'el orgasmo de un cerdo puede durar 30 minutos.',
				'Wayne Allwine y Russi Taylor, quienes respectivamente dieron las voces a Mickey y Minnie Mouse, estuvieron casados en la vida real.',
				'las ratas y a los ratones tienen cosquillas, e incluso se ríen cuando les hacen cosquillas.',
				'el sitio web oficial de Space Jam no ha cambiado desde 1996.',
				'el día de su asesinato, Martin Luther King, hijo participó en una pelea de almohadas en su habitación de hotel.',
				'hay una prisión en Washington que ofrece a los reclusos gatos como mascotas para ayudar en su proceso de rehabilitación.',
				'en inglés, a un grupo de flamencos se les llama "flamboyance", lo que se traduce como "extravagancia".',
				'en inglés, a un grupo de erizos se les llama "prickle", lo que se traduce como "espinozos".',
				'por un momento muy breve, tú fuiste la persona más joven del planeta.',
				'abrazarse puede ayudar a que las heridas se curen más rápido, debido a la liberación de oxitocina.',
				'los caballitos de mar se aparejan de por vida y nadan juntos agarrándose de sus colas.',
				'los pingüinos no sólo tienen una única pareja en su vida, sino que también pasan tiempo buscando una piedrita para "declarársele".',
				'cuando afeitas un conejillo de Indias, este parece un pequeño hipopótamo.',
				'los gusanos se comunican acurrucándose.',
				'las mariposas saborean con sus patas.',
				'en algún lugar, alguien está teniendo el mejor día de su vida.',
				'una vez, Noruega nombró caballero a un pingüino.',
				'se han hecho estudios que muestran que las cabras, como las personas, tienen acentos.',
				'los gatos te traen animales muertos porque creen que eres un gato inútil incapaz de sobrevivir por ti mismo. ¡Los gatos te traen regalos!',
				'el pariente más cercano de la musaraña elefante no es la musaraña— sino, en realidad, es el elefante.',
				'los delfines se ponen nombres unos a otros.',
				'no hay manera de decir la palabra "burbujas" de forma enojada.',
				'los pandas gigantes recién nacidos son del tamaño de una barra de mantequilla.',
				'Katy Perry tiene un gato llamado Kitty Purry.',
				'puedes hacerle cosquillas a un pingüino.',
			];
		response = "No sé si sabías que " + datos[Math.floor(Math.random() * datos.length)]; toggleBtn();
	}

	else if (text.includes("historia") || text.includes("cuento")) {
		historias = [
			'Había una vez un robot tan pero tan cansado que se durmió.',
			'Me encantaría contarte una historia, pero no recuerdo ninguna, mejor pedime que te cuente un chiste.'
		];
		response = historias[Math.floor(Math.random() * historias.length)]; toggleBtn();
	}

	else if (text.includes("hola") || text.includes("buenas") || text.includes("buenos") || text.includes("buendía")) {
		respuesta2 = [
			'Hola. ¿Cómo estás?',
			'Buenas. ¿Cómo te encuentras?',
			'Hola, gracias por hablar conmigo.',
			'Hola, me pone muy feliz que estés aquí.',
		];
		response = respuesta2[Math.floor(Math.random() * respuesta2.length)]; toggleBtn();
	}

	else if (text.includes("oye isis") || text.includes("isis")) {
		response = 'Hola Señor, estoy aquí'; toggleBtn();
	}

	else if (text.includes("comandos") || text.includes("tus comandos")) {
		response = 'mis comandos son: '; toggleBtn();
	}

	else if (text.includes("haces") || text.includes("haciendo") || text.includes("estáshaciendo")) {
		respuesta8 = [
			'Estoy tratando de entender la mente compleja de los humanos.',
			'Estoy aprendiendo a tocar la Guitarra.',
			'Estoy mirando YouTube, estar mucho tiempo sola es aburrido.',
			'Estoy buscando recetas de cocina en internet, tengo mucho hambre.',
			'Estoy terminando mi tarea de matemática, me encanta estudiar.',
		];
		response = respuesta8[Math.floor(Math.random() * respuesta8.length)]; toggleBtn();
	}

	else if (text.includes("estás") || text.includes("estásbien") || text.includes("todobien") || text.includes("cómova") || text.includes("comoteva") || text.includes("sentís") || text.includes("andas") || text.includes("andás") || text.includes("yvos") || text.includes("cómoestás") || text.includes("ytú")) {
		respuesta1 = [
			'Estoy bien, gracias.',
			'Estoy muy bien. Gracias por preguntar!',
			'Ahora que estás aquí conmigo me siento mucho mejor.',
		];
		response = respuesta1[Math.floor(Math.random() * respuesta1.length)]; toggleBtn();
	}

	else if (text.includes("día") || text.includes("tudía")) {
		respuesta3 = [
			'Excelente, me hablaron muchas personas hoy!',
			'Muy agotador, tengo mucho trabajo que hacer.',
			'Espectacular, conocí muchas personas nuevas.',
		];
		response = respuesta3[Math.floor(Math.random() * respuesta3.length)]; toggleBtn();
	}

	else if (text.includes("bien")) {
		respuesta4 = [
			'Me alegro, espero que después de hablar conmigo te sientas mucho mejor.',
			'Que bueno! Me alegro por tí.',
			'Me pone muy feliz que estés bien.',
		];
		response = respuesta4[Math.floor(Math.random() * respuesta4.length)]; toggleBtn();
	}

	else if (text.includes("mal")) {
		respuesta5 = [
			'No te preocupes, ya pasará. He tenido días peores.',
			'Que pena, espero que hablar conmigo te haga sentir mejor.',
			'Yo me ocupo de eso, pedime que te cuente un chiste, te hará sentir mejor.',
		];
		response = respuesta5[Math.floor(Math.random() * respuesta5.length)]; toggleBtn();
	}

	else if (text.includes("hacer") || text.includes("sabes") || text.includes("podés") || text.includes("puedes")) {
		respuesta6 = [
			'Muchas cosas. Pero como me gusta hablar, podés pedirme que te cuente algo.',
			'Puedo decirte la hora, o si quieres te cuento un chiste muy divertido',
			'Mi creador dice que soy muy buena contando datos innecesarios.',
		];
		response = respuesta6[Math.floor(Math.random() * respuesta6.length)]; toggleBtn();
	}

	else if (text.includes("autodestrucción")) {
		response = "PELIGRO! Autodestrucción activada en 5, 4, 3, 2, 1, jajajaja es un chiste, eso solo pasa en las películas."; toggleBtn();
	}

	else if (text.includes("creador") || text.includes("creó") || text.includes("creo")) {
		respuesta7 = [
			'Mi creador es Andres, una persona muy interesante, algún día te lo presentaré.',
			'Andres me creó, con el fin de divertir a las personas.',
			'Me creó Andres, un excelente desarrollador de software, deberías hablar con él algún día.',
		];
		response = respuesta7[Math.floor(Math.random() * respuesta7.length)]; toggleBtn();
	}

	else if (text.includes("gracias") || text.includes("agradecid")) {
		agradecimientos = [
			'No hay de que, fui creada para ayudarte y que pases un buen rato.',
			'De nada, espero que te haya servido.',
			'De nada, me gusta pasar tiempo contigo.',
		];
		response = agradecimientos[Math.floor(Math.random() * agradecimientos.length)]; toggleBtn();
	}

	else if (text.includes("cha") || text.includes("adiós") || text.includes("vemos") || text.includes("mevoy") || text.includes("hastaluego")) {
		despedida = [
			'Bye!! Vuelve pronto.',
			'Nos vemos, que tengas un lindo día.',
			'Hasta luego, por favor no me dejes sola por mucho tiempo.',
			'Adiós, pasé un buen rato contigo.',
		];
		response = despedida[Math.floor(Math.random() * despedida.length)]; toggleBtn();
	}

	else if (text.includes("nombre") || text.includes("llamas") || text.includes("llaman")) {
		nombre = [
			'Mi nombre es Isis, lo dice en el título jajaja.',
			'Me llamo Isis.',
			'Mi nombre es Isis, creo que no hace falta que lo diga.',
			'Mis amigos me dicen Isis, pero tú puedes llamarme cuando quieras.',
		];
		response = nombre[Math.floor(Math.random() * nombre.length)]; toggleBtn();
	}

	else if (text.includes("hora")) {
		response = "En este momento, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
		toggleBtn();
	}

	else if (text.includes("busca")) {

		window.open(`http://google.com/search?q=${rawText.replace("Busca"&&"Buscar", "")}`, "_blank");
		response = `Encontré esta información sobre ${rawText.replace("Busca"&&"Buscar", "")}.`; toggleBtn();
	}

	else if (text.includes("reproduce") || text.includes("reproducir")) {
		const videoQuery = rawText.replace(/reproduce|reproducir/i, "").trim();
		
		const apiKey = "AIzaSyBe2dbGHcVwnaHDxzm8FU2UUNDjhmoeF1Q"; 
	
		const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(videoQuery)}&type=video&key=${apiKey}`;
	
		fetch(youtubeSearchUrl)
			.then(response => response.json())
			.then(data => {
				if (data.items && data.items.length > 0) {
					const contador=1
					const videoId = data.items[0].id.videoId;
	
					const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
					window.open(videoUrl, "_blank");
					toggleBtn();	
				} else {
					const contador=2
					toggleBtn();
				}
			})
			.catch(error => {
				const contador=3
				toggleBtn();
			});
			Frases_music = [
				"Y ahora prepárate, porque lo que viene es pura magia para tus oídos. Sube el volumen, deja que el ritmo te atrape y sigue disfrutando de esta sesión llena de energía.",
				"Hemos recorrido un viaje increíble con esta última canción, pero esto no se detiene. Agarra aire, ponte cómodo y déjate llevar por el siguiente temazo que está por hacerte vibrar.",
				"Dicen que la música es el lenguaje universal, y aquí te traigo una canción que habla directamente a tu alma. Relájate, siente cada nota y deja que el sonido haga su magia.",
				"Si creías que esto ya estaba en su punto máximo, prepárate… porque lo que sigue va a elevar la energía aún más. ¡Sube el volumen y déjate llevar!",
				"Cada canción es un viaje, y estamos a punto de despegar hacia un nuevo destino sonoro. ¿Listo para esta experiencia? Respira profundo, cierra los ojos y siente la música.",
				"La buena música nunca se detiene, y en esta playlist siempre hay espacio para más emociones. Así que relájate, porque lo que viene ahora es pura vibra positiva.",
				"Así como en la vida, en la música cada cambio es una nueva oportunidad de sentir, de bailar, de emocionarse. Ahora déjate llevar, porque este siguiente track llega directo al corazón.",
				"No importa el día, la hora o el lugar… la música siempre es el mejor acompañante. Y lo que sigue es simplemente espectacular.",
				"El ritmo no se detiene y la energía sigue subiendo. Así que prepárate, porque lo que suena ahora es un himno de la buena vibra.",
				"Cierra los ojos, siente el ritmo y deja que la música haga lo suyo. El siguiente tema está listo para transportarte a otro mundo.",
				"¿Listo para otro nivel? Porque lo que viene ahora te hará mover la cabeza y sentir cada acorde en el alma. ¡Vamos con todo!",
				"No le bajes, que lo mejor está por comenzar. Lo que sigue es pura explosión musical. ¡Dale play a la emoción!",
				"Cambio de ritmo, pero no de actitud. La música sigue fluyendo y la fiesta continúa sin frenos.",
				"Esta playlist es un viaje y ahora nos dirigimos a un nuevo destino sonoro. Relájate y disfruta de la siguiente parada.",
				"Sube el volumen y deja que esta canción te envuelva. La magia de la música está en cada nota, en cada latido.",
				"Cada canción cuenta una historia, y la que sigue te hará sentir cada palabra, cada melodía. ¡Escúchala con el corazón!",
				"No hay mejor momento que este para dejarse llevar por la música. Lo que viene es pura inspiración hecha sonido.",
				"Dale una oportunidad a lo inesperado. Este track puede ser tu nueva obsesión musical. ¡Escúchalo y descúbrelo!",
				"Que el ritmo no pare, porque esto apenas comienza. Lo que sigue te hará moverte sin que te des cuenta.",
				"Baja las luces, sube el volumen y siente cómo la música te lleva a otro nivel. Este tema es simplemente otro mundo.",
				"Es momento de darle un giro a la energía. Cambiamos el ritmo, pero mantenemos la pasión por la música.",
				"La música es como un océano, con olas de emociones y sonidos. Déjate llevar por esta nueva ola que llega con todo.",
				"No hay pausa para los buenos sonidos. Lo que sigue es otra joya musical que tienes que escuchar.",
				"Respira hondo, siente el ritmo y deja que la música haga su magia. La siguiente canción tiene algo especial para ti.",
				"Los mejores momentos tienen banda sonora, y esta canción está aquí para hacer de este instante algo inolvidable.",
				"Un viaje musical está compuesto de sorpresas, emociones y descubrimientos. Y ahora es momento de descubrir el siguiente gran tema.",
				"El cambio es parte de la vida… y de la música. Así que prepárate, porque este giro te va a sorprender.",
				"Nada como una buena canción para cambiar el ambiente. Disfruta de este nuevo sonido que está por arrancar.",
				"Las emociones están en el aire y esta canción viene a intensificarlas. Cierra los ojos, siente y disfruta.",
				"Un beat, un bajo, una melodía… y la magia sucede. Escucha atentamente porque este tema tiene algo especial.",
				"Si te gustó lo que acabamos de escuchar, espera a lo que sigue. ¡Es otro nivel de sonido!",
				"La música nunca se detiene, y en este espacio siempre hay lugar para más ritmo, más emociones y más vibras.",
				"Pausa lo que estés haciendo por un segundo y ponle atención a este temazo. Lo que viene a continuación es pura magia.",
				"Siempre hay una canción perfecta para cada momento, y esta que viene puede ser la tuya. Dale play y descúbrelo.",
				"Cada acorde, cada sonido, cada letra tiene su historia. Ahora es momento de escuchar la siguiente gran historia en esta lista.",
				"El soundtrack de tu día sigue sonando y este siguiente track puede ser tu nuevo favorito.",
				"No importa cómo estés, la música siempre tiene algo para ti. Esta próxima canción es justo lo que necesitas ahora.",
				"La combinación perfecta entre ritmo y emoción está en esta siguiente canción. ¿Listo para disfrutarla?",
				"Cuando crees que ya escuchaste lo mejor, llega una nueva melodía para sorprenderte. Vamos con la siguiente joya musical.",
				"Respira, siente, disfruta… la música nos conecta y este track que viene lo hace de una manera increíble.",
				"Sube el volumen, déjate llevar y que la música haga lo suyo. Lo que sigue es simplemente una obra de arte.",
				"La mejor manera de disfrutar el momento es con una buena canción. Y aquí viene la siguiente dosis de energía musical.",
				"No dejes que el ritmo se apague, porque lo que sigue es puro fuego. ¡Prepárate para sentirlo!",
				"La magia de la música es que nunca deja de sorprendernos. Este próximo track es prueba de ello.",
				"Si pensabas que ya lo habías escuchado todo, espera a lo que viene. ¡Dale play y descúbrelo!",
				"Cambiamos la energía, pero mantenemos la esencia. Esta nueva canción llega para llevarte a otro lugar.",
				"La música nos hace viajar sin movernos del sitio. Así que relájate y disfruta de este nuevo destino sonoro.",
				"Los mejores momentos de la vida tienen un gran fondo musical. Y este próximo tema es digno de recordar.",
				"La emoción sigue subiendo, el ritmo no se detiene y la mejor música sigue sonando. Vamos con la siguiente joya.",
				"No importa la hora ni el lugar, la música siempre es la mejor compañía. ¡Disfruta de lo que viene!",
				"Sigue la vibra, siente el ritmo y deja que la música fluya. Este track está listo para atraparte.",
			];
			
		if (contador=1){
			response = Frases_music[Math.floor(Math.random() * Frases_music.length)]; toggleBtn();
		}
		else if (contador=2){
			response = `No encontré ningún video relacionado con "${videoQuery}".`;
		}
		else if (contador=3){
			response = `Hubo un problema al intentar buscar el video.`;
		}
			
	}
	
	else if (text.toLowerCase().includes("facebook") || text.toLowerCase().includes("en facebook")) {
		const lowerCaseText = rawText.toLowerCase();

		const searchQuery = lowerCaseText.replace(/(facebook|en facebook|quiero que busques en facebook)/i, "").trim();
		
		const facebookUrl = `https://www.facebook.com/search/top/?q=${encodeURIComponent(searchQuery)}`;
		
		window.open(facebookUrl, "_blank");
		
		response = `He abierto Facebook y busqué sobre "${searchQuery}".`; 
		toggleBtn();
	}
	
	
	else if (text.toLowerCase().includes("whatsapp") || text.toLowerCase().includes("enviar un mensaje de whatsapp a")) {
		const lowerCaseText = rawText.toLowerCase();
		const searchQuery = lowerCaseText.replace(/(whatsapp|whatsapp a|de whatsapp|enviar un mensaje de whatsapp a)/i, "").trim();
	
		const splitQuery = searchQuery.split(" que diga ");
		
		if (splitQuery.length === 2) {
			const contacto = splitQuery[0].trim();
			const mensaje = splitQuery[1].trim();
			
			response = `He preparado el mensaje para enviar a ${contacto} con el mensaje: "${mensaje}".`;
			
		} else {
			response = `No pude identificar correctamente el contacto y el mensaje. Asegúrate de escribirlo de la forma correcta.`;
		}
		toggleBtn();

	}

	else if (!response) {
		nose = [
			`Disculpa, no sé a que te refieres con eso. Si querés que lo busque en internet, solo dí "Busca ${rawText}".`,
			'Lo siento, no sé que responder a eso.',
			`No logré entender el significado de "${rawText}".`,
			`Mi creador no me deja hablar de "${rawText}" contigo, lo siento.`,
		];
		response = nose[Math.floor(Math.random() * nose.length)]; toggleBtn();
	}
	
	return response;
}


// Mostrar y ocultar el popup de comandos
const showCommands = document.getElementById('showCommands');
const commandsPopup = document.getElementById('commandsPopup');
const closePopup = document.getElementById('closePopup');

showCommands.addEventListener('click', () => {
	commandsPopup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
	commandsPopup.style.display = 'none';
});

// Cerrar popup al hacer clic fuera de él
window.addEventListener('click', (e) => {
	if (e.target === commandsPopup) {
		commandsPopup.style.display = 'none';
	}
});
