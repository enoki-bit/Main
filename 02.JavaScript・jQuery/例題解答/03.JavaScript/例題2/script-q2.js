function judge_event_number(num)
{
    let strVal = null;

    if(num % 2 == 0)
    {
        strVal = '偶数';
    }
    else
    {
        strVal = '奇数';
    }

    alert(strVal);
}

// let intVal = null;
// intVal = 4;

judge_event_number(10);

