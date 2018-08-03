var App = {
	
	setSkillsDescription: function() {
		var skills = document.querySelectorAll('.skills-diagram > div');
		var skillDescriptionContainer = document.getElementsByClassName('skills-description')[0];
		
		var skillsDescriptionList = {
			'skill-asp-net': 'The development of applications based on ASP.NET framework is my main focus. I work with both ASP.NET and ASP.NET Core.',
			'skill-c-sharp': 'I use C# as my main programming language. I prefer to use modern versions (C# 6/7), but I can also work with legacy code.',
			'skill-js': 'Good skills in vanilla.js, jQuery. Have experience in creating single page applications using ractive.js library.',
			'skill-html-css': 'As a backend developer, I pay more attention to server-side technologies, but I have some skills in frontend development as well. For UI in my personal projects I prefer to use Bootstrap library. And I don\'t use tables for markup layouts :)',
			'skill-database': 'I worked with different relational database management systems: MS SQL Server, MySQL, PostgreSQL. As a data access technology, I prefer to use the Entity Framework, but I can also use plain SQL if it is necessary. Have experience with NoSQL solutions, e.g. Couchbase.',
			'skill-cleancode': 'I know how to keep it simple and don\'t repeat myself. S.O.L.I.D. skills in object-oriented design.'
		}

		for (var i = 0; i < skills.length; i++) {
			skills[i].addEventListener("click", function() {
				skillDescriptionContainer.innerHTML = skillsDescriptionList[this.className];
			});
		}

		skills[0].click();
	},

	setupTypewriter: function(t, options, callback) {
		var HTML = t.innerHTML;

		t.innerHTML = "";

		var cursorPosition = 0,
			typeSpeed = options.typeSpeed || 1,			
			typeSymbolsCount = options.typeSymbolsCount || 5,
			pauseOnEOL = options.pauseOnEOL || false;

		var type = function() {
	
			var currentSymbol = HTML.substr(cursorPosition, typeSymbolsCount);
			var nextSymbol = HTML.substr(cursorPosition + 1, 1);

			t.innerHTML += currentSymbol;
			cursorPosition += typeSymbolsCount;

			if (cursorPosition < HTML.length - typeSymbolsCount) {
				pauseOnEOL && nextSymbol === "\n" 
					? setTimeout(type, 500)
					: setTimeout(type, typeSpeed);				
			} else {
				if (callback && typeof callback === 'function') {
					callback();
				}
			}
		};

		return {
			type: type
		};
	},

	typewrite: function() {
		var _self = this;
		var titleElement = document.getElementById('typewrite-title');
		var typeOptions = { };

		typewriter = _self.setupTypewriter(titleElement, typeOptions, function () {
			var infoElement = document.getElementById('typewrite-info');
			infoElement.removeAttribute('hidden');

			titleElement.classList.remove('rectangle-cursor');

			var options = {
				typeSpeed: 10,
				typeSymbolsCount: 1,
				pauseOnEOL: true
			};

			infoTypewriter = _self.setupTypewriter(infoElement, options);
			infoTypewriter.type();
		});

		typewriter.type();
	},

	init: function() {
		this.setSkillsDescription();
	}

};

App.init();
App.typewrite();