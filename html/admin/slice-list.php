<?PHP
# The current directory
$directory = dir("./");

# If you want to turn on Extension Filter, then uncomment this:
$allowed_ext = [".html"];


## Description of the soft: list_dir_files.php
## Major credits: phpDIRList 2.0 -(c)2005 Ulrich S. Kapp :: Systemberatung ::

$do_link   = true;
$sort_what = 0; //0- by name; 1 - by size; 2 - by date
$sort_how  = 0; //0 - ASCENDING; 1 - DESCENDING


# # #
function dir_list($dir)
{
    $i  =0;
    $dl = [];
    if ($hd = opendir($dir)) {
        while ($sz = readdir($hd)) {
            if (preg_match("/^\./", $sz)==0) {
                $dl[] = $sz;
            }
            $i.=1;
        }
        closedir($hd);
    }
    asort($dl);
    return $dl;
}
if ($sort_how == 0) {
    function compare0($x, $y)
    {
        if ($x[0] == $y[0]) {
            return 0;
        } elseif ($x[0] < $y[0]) {
            return -1;
        } else {
            return 1;
        }
    }
    function compare1($x, $y)
    {
        if ($x[1] == $y[1]) {
            return 0;
        } elseif ($x[1] < $y[1]) {
            return -1;
        } else {
            return 1;
        }
    }
    function compare2($x, $y)
    {
        if ($x[2] == $y[2]) {
            return 0;
        } elseif ($x[2] < $y[2]) {
            return -1;
        } else {
            return 1;
        }
    }
} else {
    function compare0($x, $y)
    {
        if ($x[0] == $y[0]) {
            return 0;
        } elseif ($x[0] < $y[0]) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare1($x, $y)
    {
        if ($x[1] == $y[1]) {
            return 0;
        } elseif ($x[1] < $y[1]) {
            return 1;
        } else {
            return -1;
        }
    }
    function compare2($x, $y)
    {
        if ($x[2] == $y[2]) {
            return 0;
        } elseif ($x[2] < $y[2]) {
            return 1;
        } else {
            return -1;
        }
    }
}

##################################################
#    We get the information here
##################################################

$i = 0;
while ($file=$directory->read()) {
    $file = strtolower($file);
    $ext  = strrchr($file, '.');
    if (isset($allowed_ext) && (!in_array($ext, $allowed_ext, true))) {
        // dump
    } else {
        $temp_info        = stat($file);
        $new_array[$i][0] = $file;
        $new_array[$i][1] = $temp_info[7];
        $new_array[$i][2] = $temp_info[9];
        $new_array[$i][3] = date("F d, Y", $new_array[$i][2]);
        $i                = $i + 1;
    }
}
$directory->close();

##################################################
# We sort the information here
#################################################

switch ($sort_what) {
    case 0:
        usort($new_array, "compare0");
        break;
    case 1:
        usort($new_array, "compare1");
        break;
    case 2:
        usort($new_array, "compare2");
        break;
}

###############################################################
#    We display the infomation here
###############################################################

$i2 = count($new_array);
$i  = 0;

?>

<ul>
    <?php
    for ($i=0;$i<$i2;$i++) {
        if ($do_link) {
            echo '<li>
                    <a target="blank" href="'.$new_array[$i][0].'">
                        '.$new_array[$i][0].'
                    </a>
                </li>'
            ?>

            <?php

        }
    }
    ?>
</ul>