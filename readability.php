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
use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;

/**
 * Measure the readability of text, and highlight the difficulty of sentences and words.
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
                    'onTwigTemplatePaths' => ['templates', 0],
                    'onGetPageTemplates' => ['onGetPageTemplates', 0],
                    'onPageInitialized' => ['onAdminPagesAssetsInitialized', 0]
                ]
            );
        }
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
        $res = Grav::instance()['locator'];
        $path = $res->findResource('plugin://' . $this->name, false);
        $this->grav['assets']->addCss($path . '/css/admin.css');
        $this->grav['assets']->addJs($path . '/node_modules/promise-worker/dist/promise-worker.min.js');
        if ($this->grav['config']->get('plugins.readability.tooltips')) {
            $this->grav['assets']->addCss($path . '/node_modules/tippy.js/index.css');
            $this->grav['assets']->addCss($path . '/node_modules/tippy.js/themes/light.css');
            $this->grav['assets']->addCss($path . '/node_modules/tippy.js/themes/light-border.css');
            $this->grav['assets']->addJs($path . '/node_modules/popper.js/dist/umd/popper.min.js');
            $this->grav['assets']->addJs($path . '/node_modules/tippy.js/umd/index.min.js');
        }
        $this->grav['assets']->addJs($path . '/node_modules/localized-readability/dist/hypher.js');
        $this->grav['assets']->addJs($path . '/node_modules/localized-readability/dist/patterns/' . self::getLanguage() . '.js');
        $this->grav['assets']->addJs($path . '/node_modules/localized-readability/dist/annotations/language.' . self::getLanguage() . '.js');
        $this->grav['assets']->addJs($path . '/node_modules/localized-readability/dist/localized-readability.min.js');
        $this->grav['assets']->addInlineJs(
            'const readabilityLanguage = "' . self::getLanguage() . '";' . "\n" .
            'const readabilityTooltips = "' . $this->grav['config']->get('plugins.readability.tooltips') . '";'
        );
        $this->grav['assets']->addJs($path . '/js/admin.js', ["group" => "bottom"]);
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
        if (Grav::instance()['config']->get('plugins.readability.language')) {
            return Grav::instance()['config']->get('plugins.readability.language');
        }
        return Grav::instance()['language']->getLanguage() ?: $default;
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
