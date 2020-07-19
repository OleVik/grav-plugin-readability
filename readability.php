<?php
/**
 * Readability Plugin
 *
 * PHP version 7
 *
 * @category   Extensions
 * @package    Grav
 * @subpackage Readability
 * @author     Ole Vik <git@olevik.net>
 * @license    http://www.opensource.org/licenses/mit-license.html MIT License
 * @link       https://github.com/OleVik/grav-plugin-readability
 */
namespace Grav\Plugin;

use Grav\Common\Grav;
use Grav\Common\Utils;
use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;

/**
 * Measure the readability of text, and highlight difficulty of sentences and words.
 *
 * Class ReadabilityPlugin
 *
 * @category Extensions
 * @package  Grav\Plugin
 * @author   Ole Vik <git@olevik.net>
 * @license  http://www.opensource.org/licenses/mit-license.html MIT License
 * @link     https://github.com/OleVik/grav-plugin-readability
 */
class ReadabilityPlugin extends Plugin
{
    /**
     * Register intial event and libraries
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0],
        ];
    }

    /**
     * Initialize the plugin and events
     *
     * @return void
     */
    public function onPluginsInitialized()
    {
        if ($this->config->get('plugins.readability.enabled') != true) {
            return;
        }
        $config = $this->config->get('plugins.readability');
        if ($this->config->get('system.debugger.enabled')) {
            $this->grav['debugger']->startTimer('readability', 'Readability');
        }
        if ($this->isAdmin() && $this->config->get('plugins.admin.enabled') == true) {
            $this->enable(
                [
                    'onGetPageTemplates' => ['onGetPageTemplates', 0],
                    'onPageInitialized' => ['onAdminPagesAssetsInitialized', 0]
                ]
            );
        }
        $this->enable(
            [
                'onTwigTemplatePaths' => ['templates', 0],
                'onTwigExtensions' => ['onTwigExtensions', 0]
                ]
        );
        if ($this->config->get('system.debugger.enabled')) {
            $this->grav['debugger']->stopTimer('readability');
        }
    }

    /**
     * Add templates-directory to Twig paths
     *
     * @return void
     */
    public function templates()
    {
        $this->grav['twig']->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * Register Page templates
     *
     * @param Event $event RocketTheme\Toolbox\Event\Event
     *
     * @return void
     */
    public function onGetPageTemplates(Event $event)
    {
        $types = $event->types;
        $locator = Grav::instance()['locator'];
        $types->scanBlueprints($locator->findResource('plugin://' . $this->name . '/blueprints'));
        $types->scanTemplates($locator->findResource('plugin://' . $this->name . '/templates'));
    }
    /**
     * Add admin assets
     *
     * @return void
     */
    public function onAdminPagesAssetsInitialized()
    {
        if (!Utils::contains($this->grav['uri']->path(), 'pages', false)) {
            return;
        }
        $res = Grav::instance()['locator'];
        $path = $res->findResource('plugin://' . $this->name, false);
        $assets = $this->grav['assets'];
        $assets->addCss($path . '/css/readability.render.css');
        $assets->addCss($path . '/css/readability.admin.css');
        $assets->addJs($path . '/node_modules/promise-worker/dist/promise-worker.min.js');
        if ($this->grav['config']->get('plugins.readability.tooltips')) {
            $assets->addCss($path . '/node_modules/tippy.js/index.css');
            $assets->addCss($path . '/node_modules/tippy.js/themes/light.css');
            $assets->addCss($path . '/node_modules/tippy.js/themes/light-border.css');
            $assets->addJs($path . '/node_modules/popper.js/dist/umd/popper.min.js');
            $assets->addJs($path . '/node_modules/tippy.js/umd/index.min.js');
        }
        $assets->addJs($path . '/node_modules/localized-readability/dist/hypher.js');
        $assets->addJs($path . '/node_modules/localized-readability/dist/patterns/' . self::getLanguage() . '.js');
        $assets->addJs($path . '/node_modules/localized-readability/dist/annotations/language.' . self::getLanguage() . '.js');
        $assets->addJs($path . '/node_modules/localized-readability/dist/localized-readability.min.js');
        $assets->addInlineJs(
            'const readabilityLanguage = "' . self::getLanguage() . '";' . "\n" .
            'const readabilityBaseUrl = "' . $this->grav['uri']->rootUrl(true) . '/' . $path . '";' . "\n" .
            'const readabilityMaxWords = ' . $this->grav['config']->get('plugins.readability.max_words') . ';'
        );
        if ($this->grav['config']->get('plugins.readability.tooltips')) {
            $assets->addInlineJs('const readabilityTooltips = true;');
        } else {
            $assets->addInlineJs('const readabilityTooltips = false;');
        }
        $assets->addJs($path . '/js/readability.render.js', ["group" => "bottom"]);
        $assets->addJs($path . '/js/readability.admin.js', ["group" => "bottom"]);
    }

    /**
     * Get active language
     *
     * @param string $default Default to 'en-us'
     *
     * @return string Language from settings or Grav
     */
    public static function getLanguage($default = 'en-us')
    {
        if (Grav::instance()['language']->getLanguage()) {
            $lang = Grav::instance()['language']->getLanguage();
        } else {
            if (Grav::instance()['config']->get('plugins.readability.language')) {
                return Grav::instance()['config']->get('plugins.readability.language');
            } else {
                return $default;
            }
        }
        if ($lang == 'en') {
            $lang = $default;
        } elseif ($lang == 'nb') {
            $lang = 'nb-no';
        }
        return $lang;
    }

    /**
     * Get list of languages for blueprint
     *
     * @return array Key-value array of annotations/translations
     */
    public static function getLanguages()
    {
        $res = Grav::instance()['locator'];
        $path = $res->findResource('plugin://readability', false);
        $files = self::filesFinder(
            $path . '/node_modules/localized-readability/dist/annotations',
            ['js']
        );
        $return = array();
        foreach ($files as $file) {
            $file = str_replace('language.', '', $file->getBasename('.js'));
            $return[$file] = $file;
        }
        return $return;
    }

    /**
     * Add Twig Extensions
     *
     * @return void
     */
    public function onTwigExtensions()
    {
        include_once __DIR__ . '/twig/CallStaticExtension.php';
        $this->grav['twig']->twig->addExtension(new ReadabilityPlugin\CallStaticTwigExtension());
        include_once __DIR__ . '/twig/FindResourceExtension.php';
        $this->grav['twig']->twig->addExtension(new ReadabilityPlugin\FindResourceTwigExtension());
    }

    /**
     * Search for a file in multiple locations
     *
     * @param string $file      Filename.
     * @param array  $locations List of folders.
     *
     * @return string
     */
    public static function fileFinder(string $file, array $locations)
    {
        foreach ($locations as $location) {
            if (file_exists($location . '/' . $file)) {
                return $location . '/' . $file;
                break;
            }
        }
        return false;
    }

    /**
     * Search for files in multiple locations
     *
     * @param string $directory Folder-name.
     * @param string $types     File extensions.
     *
     * @return string
     */
    public static function filesFinder(string $directory, array $types)
    {
        $iterator = new \RecursiveDirectoryIterator(
            $directory,
            \RecursiveDirectoryIterator::SKIP_DOTS
        );
        $iterator = new \RecursiveIteratorIterator($iterator);
        $files = [];
        foreach ($iterator as $file) {
            if (in_array(pathinfo($file, PATHINFO_EXTENSION), $types)) {
                $files[] = $file;
            }
        }
        if (count($files) > 0) {
            return $files;
        } else {
            return false;
        }
    }
}
