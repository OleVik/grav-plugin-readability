<?php
namespace Grav\Plugin;

use Grav\Common\Grav;

class FindResourceTwigExtension extends \Twig_Extension
{
    public function getName()
    {
        return 'FindResourceTwigExtension';
    }
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('findresource', [$this, 'getter'])
        ];
    }
    public function getter(string $uri, boolean $absolute = null, boolean $first = null)
    {
        return Grav::instance()['locator']->findResource($uri, $absolute, $first);
    }
}