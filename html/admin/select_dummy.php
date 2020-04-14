<?php 

$ret        = new stdClass();
$ret->items = [];

for ($i=1 ; $i<=10 ; $i++) {
    $object       = new stdClass();
    $object->id   = $i;
    $object->text = substr('Lorem ipsum Ut nisi adipisicing exercitation aliqua fugiat aute eu dolor cupidatat reprehenderit est irure consectetur veniam minim eiusmod dolore nisi mollit proident consequat fugiat reprehenderit fugiat mollit fugiat nisi culpa nulla officia irure ut occaecat sit eu anim dolore fugiat Duis tempor amet laboris in cillum eiusmod enim velit nulla deserunt esse aliquip dolor ullamco elit laboris incididunt laboris non nostrud Excepteur sunt sunt ea non amet aliqua esse anim aliqua sed pariatur et nostrud dolore consequat nisi elit quis ex aliqua velit consectetur commodo sunt id ut nisi ea eiusmod incididunt est quis sit fugiat pariatur Duis Excepteur tempor in sint ea ullamco mollit aliquip Ut dolore do in cillum tempor enim laboris Duis Ut sint incididunt laborum incididunt irure aliquip in voluptate tempor culpa veniam est consequat incididunt culpa exercitation dolore mollit ullamco in magna sunt.', rand(0, 100), rand(100, 200));
    array_push($ret->items, $object);
}

header('Content-Type: application/select+json');

if (isset($_REQUEST['q'])) {
    $ret->items = reset($ret->items);
    echo json_encode($ret);
} else {
    echo json_encode($ret);
}
