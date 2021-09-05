let questionsJson

$('#test').hide()
$('#result').hide()

$('#start_test').on('click',()=>{
    $('#form').hide()
    $('#test').show()
    generateQuestionsHtml()
})

$('#finish').on('click',()=>{
    $('#test').hide()
    $('#result').show()
    calculateResult()
})

$('#start_over').on('click',()=>{
    $('#result').hide()
    $('#form').show()
})

function generateQuestionsHtml(){
    $.get("https://opentdb.com/api.php?amount=10&category=" + $('#category').val() + '&difficulty=' + $('#difficulty').val(), (data) => {
        $("#questions").text(data);

        questionsJson = data['results']

        let questions_html = "<hr>";

        questionsJson.forEach((element, key) => {
            questions_html += "<span><b>Category:</b>"+ element['category'] +"</span><br>"
                                +  "<span><b>Difficulty:</b>"+ element['difficulty'] +"</span><br>"
                                +  "<span><b>Question:</b>"+ element['question'] +"</span><br>"

            if(element['type'] == 'boolean'){
                questions_html += "<input id='true-" + key + "' name='" + key + "' value='True' type='radio'>"+
                " <label for='true-" + key + "'>True</label><br>"+
                "<input id='false-" + key + "' name='" + key + "' value='False' type='radio'>"+
                " <label for='false-" + key + "'>False</label>"+
                "<hr>"
            }
            else{
                let all_answers = [];
                // sort answers
                all_answers.push(element['correct_answer'])
                element['incorrect_answers'].forEach((ans)=>{
                    all_answers.push(ans)
                })
                all_answers.sort()

                all_answers.forEach((el, k)=>{
                    questions_html += "<input id='" + k + "-" + key + "' name='" + key + "' value='"+ el +"' type='radio'> "+
                    "<label for='" + k + "-" + key + "''>"+ el +"</label><br>"
                })
                
                questions_html += "<hr>"
            }
        });

        $('#questions').html(questions_html) 
      });
}

function calculateResult(){
    let points = 0
    questionsJson.forEach((element,key)=>{
        let answer = $("input[name="+key+"]:checked").val();
        if(questionsJson[key]['correct_answer']  == answer) points++
    })
    $('#points').text(points)
}



