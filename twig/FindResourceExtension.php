<?php
namespace Grav\Plugin\ReadabilityPlugin;

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
    public function getter(string $uri, bool $absolute = null, bool $first = null)
    {
        return Grav::instance()['locator']->findResource($uri, $absolute, $first);
    }
}
