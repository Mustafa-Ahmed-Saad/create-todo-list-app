let theInput = document.getElementById('input-div'),
theAddButton = document.querySelector('.add-tasks .plus'),
theTasksContainer = document.querySelector('.tasks-content'),
tasksCount = document.querySelector('.tasks-count span'),
taskscompleted = document.querySelector('.tasks-completed span');


window.onload = function() {
    theInput.focus();
}

theAddButton.onclick = function() {
    // we can use sweet alert in if condition
    if (theInput.value === '' || theInput.value === ' ') {
        return false;
    } else {

        let noTasksMsg = document.querySelector('.no-tasks-message');  // بعد ما كانت فوق جبناها هنا افضل لان لو انت عملتها فوق فهيا هتخزن جواها و هتكون شايفة السبان الاولاني اللي موجود في الاتش تي ام ال اصلا و لما بنيجي نمسحو بيتمسح عادي في اول مرة بنضيف فيها لكن بعد كدا لما نفضي و نشيل كل التاسكات فهيبدا يتكريت عنصر ديد متخزن في فاريابول اسمو ماسيد سبان و العنصر دا اتكريت بعد ما اشتغلما في الصفحة و عملنا مذا حاجة فالمتغير النوت تاسك ماسيج لو كان لسا فوق مش هيشوف السبان الجديدة اللي اتعملت لان السطر اللي فوق مش هيتنفز غير مرة واحدة فقط في بداية تلويدة الصفحة فعلشان كدا بدل ما نحطو فوق هنحطو هنا علشان كل ما يعمل كليك علي زرار اضافة تاسك يبدا السطر دا يتعمل و يروح يشوف العنصر اللي لية كلاس اسمونو تاسك تاسكس ماسيج من اول و جديد و لو لقاه هيخزنو في المتغير دا و لو ملقهوش خلاص المتغير دا هيكون قيمتة بنل و الاف اللي في السطر الجي مش هتتنفز اصلا فمش مشكلة  
        if (document.body.contains(document.querySelector('.no-tasks-message'))) { // بعمل الاف دي علشان لو الاليمينت دا مش موجودمش يجبلي ايرور لانو هيقولك رسالة خطاء يقولك انا مينفعش احزف النالل
            noTasksMsg.remove(); // السطر دا لازم نطتبو جوا الاف وبما ان الكود وصل للسطر دا يعني معني كدا ان الشخص داس علي زرار البلص او الادد و كمان الحصل كان فية كلام مكتوب فية و كمان البادي فية العنصر السبان اللي فية الرسالة اللي بتقول مفيش تسكات فاحزفو لكن لو كتبت السطر دا من غير ما تكتو جوا الاف يعني لو معملتش اف و كتبت السطر دا مباشرتا هيتنفز كل مرة في حالة لما اليوزر يضغط الزرار بلص و الحقل يكون مكتوب فية كلام بس فدا ممكن يجبلي ايرور لاني لازم اتشيك هل العنصر دا اصلا موجود ولا لا في البادي و لو موجود في البادي امسحو و لو م موجود خلاص متنفزش السطر دا و بالتالي مش هيدي ايرور لان الايرور بيطلع لما تقولو احزف العنصر دا و العنصر دا اصلا مش موجود
        }

        let mainSpan = document.createElement("span");
        mainSpan.className = 'task-box';      // mainSpan.setAttribute('class', 'task-box');
        let text = document.createTextNode(theInput.textContent);
        mainSpan.appendChild(text);
        
        let deletSpan = document.createElement("span");
        deletSpan.className = 'delete';      // deletSpan.setAttribute('class', 'delete');
        let deletetext = document.createTextNode('delete');
        deletSpan.appendChild(deletetext);
        
        mainSpan.appendChild(deletSpan);
        theTasksContainer.appendChild(mainSpan);
        
        theInput.textContent = '';
        theInput.focus();

        calculateTasks();   // طبعا لو اضاف تاسك عاوزة يعمل الفانكشن دي علشان يحسب التاسكات
    }
}


/* طيب دلوقتي انت عاوز تقول لما تضغظ علي زرار دليت احزفلي البلوك بتاع التاسك كلو اللي هوا الاب بتاع زرار الدليت دا او اللاب بتاع السبان اللي فيها الدليت دا */
/* طيب دا كلو تمام بس في مشكلة انا ازاي هجيب اصلا الزرار دا دا الزرار دا اصلا انا هسليكتو ازاي دا هوا لسا مش اتنشاء لانو مش بيتنشئ غير لما اليوزر هوا اللي يسدل تاسك جديدة فمش هعرف اسليكت زرار الدليت دا علشان احط علية ايفنت الكليك و حتي لو عرفت اسلكت الزرار دا و لكن دا صعب جدا و افرض اني مثلا عرفت اسليكت زرار الدليت دا مهو كدا برضو لما اجي ادوس علية اقولو اية امسح اية بالظبطمو اصل لو قتلو امسح الزرار اللي فية دليت هيمسح كل التاسكات */
/* يبقي انا هعمل فكرة و هي اني اقلو لو ضغطت في اي مكان شوف المكان دا او العنصر دا لو بيحتوي كلاس ديليت هاتلي العنصر دا و اعملي فيو كذا حاجة */
document.addEventListener('click', function(e) { // كدا اي مكانهيدوس علية في الصفحة هينفزالفانكشن دي و لكن الفانكن اول حاجة جواها بتتشيك لو العنصر دا ليو كلاس دليت ولا لا لو لية كمل ملوش خلاص متعملش حاجة
    //if (e.target.className) { // اوعي تعمل كدا لان الكود دا غلط و لانك كدا انت بتقولو لو العنصر اللي انا ضفطت علية كليك دا الكلاس بتاعة ديليت فقط و دا غلط لانو لو بيحتوي علي كلاس دليت و اي كلاس تاني فالشرط دا مش هيتحقق فالصح اننا نعمل التالي
    if (e.target.className == 'delete') { // كدا احنا هنسليكت العنصر اللي عمل الكليك دا و لو كان العنصر دا فية كلاس ديليت اعملي التالي
        e.target.parentNode.remove(); // كدا هنجيب الاب بتاع العنصر اللي اتسبب في الكليك و كان يملك كلاس دليت

        // if (theTasksContainer.children[0] === undefined) {
        // if (theTasksContainer.children.length == 0) {
        if (theTasksContainer.childElementCount == 0) {
            createNoTasksMsg();
        }
    }

    // يبقي لو في فكرة و عاوز اقولو اتشيك هل الكلاس بتاع العنصر دا هوا كلاس تاسك بوكس فقط و مش فية كلاسات تانية ولا لا فانت هتستخدم الكلاس نيم
    //if (e.target.className == 'task-box') { // لو عملت كدا هيبدا يحط الكلاس فينيشيد و يشد حط علي العنصر دا و لكن لما تدوس علي العنصر دا تاني مش هيشيل الكلاس دا و بالتالي م هيشيل الخط اللي حطة لان هوا بيشوف و يتشيك لو الكلاس بتاع العنصر هوا تاسك بوكس فقط ولا لا لو اه هينفز طيب لما ينفز هيكون الكلاس بقي فية كلاس تاسك بوكس و كلاس فينيشيد و بلتالي لما يجي يتشيك تاني فهيلاقي الكلاس نيم مش تاسك بوكش فقط فمش هينفز و يعمل توجيل للكلاس فينيشيد
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle('finished');
    }

    theInput.focus();
    calculateTasks();   // انا حطتها هنا مش في اي واحدة من الاف لاني انا عاوزها في الحالتين لو خلص تاسك و حط علية خط و لو مسح تاسك
})

function createNoTasksMsg() {
    let msgSpan = document.createElement('span');
    msgSpan.className = 'no-tasks-message'; // msgSpan.classList.add('no-tasks-message');
    let msgText = document.createTextNode('No Task To Show');
    msgSpan.appendChild(msgText);

    theTasksContainer.appendChild(msgSpan);
}

function calculateTasks() {
    tasksCount.textContent = document.querySelectorAll('.tasks-content .task-box').length;
    taskscompleted.textContent = document.querySelectorAll('.tasks-content .finished').length;
}




