<?php
namespace Grav\Plugin;

use Grav\Common\Grav;
use Grav\Common\Plugin;
use Grav\Common\Theme;

class CallStaticTwigExtension extends \Twig_Extension
{
    public function getName()
    {
        return 'CallStaticTwigExtension';
    }
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('callstatic', [$this, 'getter'])
        ];
    }
    public function getter(string $class, string $method, $params = false)
    {
        if (class_exists($class)) {
            return $class::$method($params);
        }
        return false;
    }
}