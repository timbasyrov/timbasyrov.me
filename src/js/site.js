var App = {
	
	setSkillsDescription: function() {
		var skills = document.querySelectorAll('.skills-diagram > div');
		var skillDescriptionContainer = document.getElementsByClassName('skills-description')[0];
		
		var skillsDescriptionList = {
			'skill-asp-net': 'ASP.NET is my main working tool. As a backend-developer I use it in many projects. Work with classic ASP.NET MVC and ASP.NET Core MVC as well',
			'skill-c-sharp': 'C Sharp description',
			'skill-js': 'JS skill description',
			'skill-html-css': 'HTML&amp;CSS skill description',
			'skill-database': 'Database skill description',
			'skill-cleancode': 'Clean code skill description'
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
				if (callback && typeof callback === "function") {
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