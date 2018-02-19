# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
articles = Article.create (
  [
    {
      author: "BBC",
      kids: "",
      parent: "",
      title: "Brazil opens vast Amazon reserve to mining",
      body: "\"Brazil's government has abolished a vast national reserve in the Amazon to open up the area to mining.
The area, covering 46,000 sq km (17,800 sq miles), straddles the northern states of Amapa and Para, and is thought to be rich in gold, and other minerals.
The government said nine conservation and indigenous land areas within it would continue to be legally protected.But activists have voiced concern that these areas could be badly compromised.A decree from President Michel Temer abolished a protected area known as the National Reserve of Copper and Associates (Renca).Its size is larger than Denmark and about 30% of it will be open to mining.
The mining and energy ministry says protected forest areas and indigenous reserves will not be affected.
\"The objective of the measure is to attract new investments, generating wealth for the country and employment and income for society, always based on the precepts of sustainability,\" 
the ministry said in a statement.",
      tags: "Google, depression",
      article_type: "news"
    },  
    
    {
      author: "Dave Lee",
      kids: "",
      parent: "",
      title: "Google will ask: 'Are you depressed?'",
      body: "People searching for \“depression\” on Google will soon be prompted to take a questionnaire to assess if they may be suffering from the illness.
The search giant has partnered with the US National Alliance on Mental Illness (Nami) to roll out the project which is currently only for US users.
Users searching for depression will be prompted to \“check if you’re clinically depressed\”.
\“While this tool can help, it’s important to note that PHQ-9 is not meant to act as a singular tool for diagnosis,\” Nami said.
In a blog post announcing the news, Nami said the test should not be seen as replacing the insight of qualified mental health professionals - was instead a method to help people get the right help more quickly.
By tapping \“Check if you’re clinically depressed,\” you can take this private self-assessment to help determine your level of depression and the need for an in-person evaluation,\” the organisation explained.
\"The results of the PHQ-9 can help you have a more informed conversation with your doctor.\"
'Trouble concentrating?'
The question will appear in the Knowledge Panel - the box that appears at the top of results when users search on a mobile device. Typically this panel is used for factual information, including details drawn from Wikipedia entries.
The Patient Health Questionnaire-9 is a series of nine questions about the subject’s mental health.
It asks how often you feel you have “little interest or pleasure in doing things” or \“trouble concentrating on things, such as reading the newspaper or watching television?\”.
Various studies have concluded it is a concise, reliable way to accurately detect signs of clinical depression.
Speaking to the Financial Times, Google product manager Vidushi Tekriwal said users who fill out the test will not have their answers logged by the company, nor would advertising be targeted to them as a result.
However, one psychotherapist said the idea seemed ""terribly redundant"".
Someone googling depression will probably not find more useful information via a short diagnostic than they have already surfaced in search results, argued Dr Aaron Balick, author of ""The Psychodynamics of Social Netowrking"".
\"A better approach would be some sort of acknowledgment that the searcher may be feeling down, and offering them resources and a direct line - perhaps a chat box - to local psychological services,\" he told the BBC.",
      tags: "Brazil, Amazon",
      article_type: "news"
    },  
  
    {
      author: "BBC Sport",
      kids: "",
      parent: "",
      title: "Wayne Rooney international retirement: How will history judge his England career?",
      body: "Wayne Rooney's retirement from international duty announced after England's all-time record goalscorer had been told he had won a recall at 31 - closes another chapter in his illustrious story.
Rooney, with 53 England goals in 119 appearances, left Manchester United to return to Everton this summer with his place in Old Trafford's history books also assured after he overtook Sir Bobby Charlton's club record with 253 goals.
He had been sidelined by Jose Mourinho at United, and also by Southgate with England, but such has been his early rejuvenation at Goodison Park that he was offered a place back in the fold for the forthcoming World Cup qualifiers against Malta and Slovakia.
Rooney, who originally planned to end his England career after next summer's World Cup in Russia, decided against a return and will now focus fully on Everton.
So how will history judge Wayne Rooney's England career?",
      tags: "Rooney, England, Soccer",
      article_type: "news"
    },  

    {
      author: "BBC Sport",
      kids: "",
      parent: "",
      title: "US Open: Milos Raonic withdraws because of wrist injury",
      body: "World number 11 Milos Raonic is the latest high-profile player to pull out of the US Open, which starts on Monday.
Canadian Raonic, 26, has withdrawn because of a persistent wrist injury but said that he planned to return to action before the end of 2017.
Defending champion Stan Wawrinka is unable to defend his singles title at Flushing Meadows because of a knee injury.
Novak Djokovic(elbow) and Victoria Azarenka will also be absent.
Belarusian Azarenka, 28, is missing the final Grand Slam of the year because of an \"ongoing family situation\".
World number 10 Kei Nishikori is also out after tearing a tendon in his right wrist.
Raonic said he was unable give \"full effort\" as a result of his injury.
\"I have too much respect for the US Open and my fellow competitors to take a spot in the draw when I know I cannot give full effort due to this injury,\" he said.",
      tags: "US Open, Tennis, Raonic",
      article_type: "news"
    }  
  ]  
)
  